<template>
  <Teleport to="body">
    <!-- Modal -->
    <Modal :show="showModal" @save="save" @close="showModal = false">
      <template #header>
        <h3>Them lich hen</h3>
      </template>
      <template #body>
        <form>
          <div class="row">
            <div class="form-group mb-2 col">
              <label>Ho va Ten</label>
              <v-select
                label="name"
                :options="identities"
                v-model="selected"
              ></v-select>
              <p v-if="v$.customer.name.$error" class="text-danger">
                Vui long chon khach hang
              </p>
            </div>
            <div class="form-group mb-2 col">
              <label for="exampleFormControlInput1">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="selected.email"
                disabled
              />
            </div>
          </div>
          <div class="form-group mb-2 w-50">
            <label>Lich hen</label>
            <Datepicker v-model="customer.event.date" :format="format" />
            <p v-if="v$.customer.event.date.$error" class="text-danger">
              Vui long cho ngay
            </p>
          </div>
          <div class="form-group mb-2 col w-75">
            <label>Noi dung</label>
            <input
              type="text"
              class="form-control"
              v-model="customer.event.content"
            />
            <p v-if="v$.customer.event.content.$error" class="text-danger">
              Yêu cầu nhập noi dung
            </p>
          </div>
          <div class="form-group mb-2 col w-75">
            <label>Tien do</label>
            <input
              type="text"
              class="form-control"
              v-model="customer.event.progress"
            />
          </div>
        </form>
      </template>
    </Modal>
  </Teleport>
  <!-- Table -->
  <div class="container-fluid px-4">
    <div class="row">
      <table class="table table-hover align-middle">
        <!-- Header -->
        <thead>
          <tr>
            <th scope="col">Ten</th>
            <th scope="col">Email</th>
            <th scope="col">Lich hen sap toi</th>
            <th scope="col">Noi dung</th>
            <th scope="col">Tien do</th>
            <th scope="col">
              <button
                type="button"
                class="btn btn-success"
                @click="showModal = true"
              >
                Them
              </button>
            </th>
          </tr>
        </thead>
        <!-- Body -->
        <tbody>
          <tr v-for="(event, index) in events" :key="index">
            <td>
              <p>{{ event.name }}</p>
            </td>
            <td>
              <p>{{ event.email }}</p>
            </td>
            <td class="w-25">
              <p>{{ event.event.date }}</p>
            </td>
            <td>
              <p>{{ event.event.content }}</p>
            </td>
            <td>
              <p>{{ event.event.progress }}</p>
            </td>
            <td>
              <router-link
                :to="{ name: 'CustomerInfo', params: { id: event.id } }"
                class="btn btn-primary me-2"
                >Chinh sua</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "@vuepic/vue-datepicker/dist/main.css";
import Datepicker from "@vuepic/vue-datepicker";
import Modal from "@/components/Modal.vue";
import vSelect from "vue-select";

import store from "@/store";
import { reactive, ref } from "@vue/reactivity";

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
// Main Script
export default {
  name: "Home",
  components: { Datepicker, Modal, vSelect },
  setup() {
    let events = reactive([]);
    store.getters.get_all_events.then((value) => {
      events = value;
    });

    let identities = reactive([]);
    store.getters.get_all_identities.then((value) => {
      identities = value;
      console.log();
    });

    //Format date picker
    let format = ref(new Date());
    format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hour = date.getHours();
      const minute = date.getMinutes();

      return `${day}/${month}/${year} ${hour}:${minute}`;
    };
    const v$ = useVuelidate();

    const customer = reactive({
      id: -1,
      name: "",
      email: "",
      event: {
        date: "",
        content: "",
        progress: "",
      },
    });
    return { events, format, identities, customer, v$ };
  },
  data() {
    return {
      showModal: false,
      selected: { id: -1, name: "", email: "" },
    };
  },
  validations() {
    return {
      customer: {
        name: { required },
        event: {
          date: { required },
          content: { required },
        },
      },
    };
  },
  methods: {
    save() {
      this.customer.id = this.selected.id;
      this.customer.name = this.selected.name;
      this.customer.email = this.selected.email;
      this.customer.event.date = this.customer.event.date.toLocaleString();

      this.v$.$validate();
      if (!this.v$.$error) {
        store.commit("add_event", {
          id: this.customer.id,
          event: this.customer.event,
        });
        this.showModal = false;
        this.events = store.getters.get_all_events;
      }
    },
  },
};
</script>
