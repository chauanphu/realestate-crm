<template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Them lich hen</h3>
      </template>
      <template #body>
        <form>
          <div class="row">
            <div class="form-group mb-2 col">
              <label>Ho va Ten</label>
              <v-select></v-select>
              <!-- <p v-if="v$.customer.name.$error" class="text-danger">
                Yêu cầu nhập tên
              </p> -->
            </div>
            <div class="form-group mb-2 col">
              <label for="exampleFormControlInput1">Email</label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                disabled
              />
              <!-- <p v-if="v$.customer.email.$error" class="text-danger">
                Yeu cau kiem tra lai email
              </p> -->
            </div>
          </div>
          <div class="form-group mb-2 col w-75">
            <label>Noi dung</label>
            <input type="text" class="form-control" />
            <!-- <p v-if="v$.customer.name.$error" class="text-danger">
                Yêu cầu nhập tên
              </p> -->
          </div>
          <div class="form-group mb-2 col w-75">
            <label>Tien do</label>
            <input type="text" class="form-control" />
            <!-- <p v-if="v$.customer.name.$error" class="text-danger">
                Yêu cầu nhập tên
              </p> -->
          </div>
          <div class="form-group mb-2 w-50">
            <label>Lich hen</label>
            <Datepicker v-model="form_date" :format="format" />
          </div>
        </form>
      </template>
    </Modal>
  </Teleport>
  <div class="container-fluid px-4">
    <div class="row">
      <table class="table table-hover align-middle">
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
        <tbody>
          <tr v-for="(event, index) in events" :key="index">
            <td>
              <p>{{ event.name }}</p>
            </td>
            <td>
              <p>{{ event.email }}</p>
            </td>
            <td class="w-25">
              <Datepicker v-model="event.date" :format="format" />
            </td>
            <td>
              <input
                class="form-control"
                type="text"
                aria-label="default input example"
                v-model="event.content"
              />
            </td>
            <td>
              <input
                class="form-control"
                type="text"
                aria-label="default input example"
                v-model="event.progress"
              />
            </td>
            <td>
              <button class="btn btn-danger" @click="deleteEvent(index)">
                Xoa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import store from "@/store";
import { ref } from "@vue/reactivity";
import Modal from "@/components/Modal.vue";
import vSelect from "vue-select";

export default {
  name: "Home",
  components: { Datepicker, Modal, vSelect },
  setup() {
    const events = store.getters.get_all_events;

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
    return { events, format };
  },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>
