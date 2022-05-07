<template>
  <div class="container-fluid px-4">
    <button @click="save" class="btn btn-primary mb-4">Save</button>
    <form class="row row-cols-2 w-50">
      <div class="form-group mb-2 col">
        <label for="exampleFormControlInput1">Ho va Ten</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          v-model="customer.name"
        />
        <p v-if="v$.customer.name.$error" class="text-danger">
          Yêu cầu nhập tên
        </p>
      </div>
      <div class="form-group mb-2 col">
        <label for="exampleFormControlInput1">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          v-model="customer.email"
        />
        <p v-if="v$.customer.email.$error" class="text-danger">
          Yeu cau kiem tra lai email
        </p>
      </div>
      <div class="form-group mb-2 col">
        <label for="exampleFormControlInput1">SDT</label>
        <input
          type="tel"
          class="form-control"
          id="exampleFormControlInput1"
          v-model="customer.phone"
        />
      </div>
      <div class="form-group mb-2 col">
        <label for="exampleFormControlInput1">Tuoi</label>
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          v-model.number="customer.age"
        />
        <p v-if="v$.customer.age.$error" class="text-danger">
          Tuoi khong hop le
        </p>
      </div>
    </form>
    <div class="row">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Lich hen sap toi</th>
            <th scope="col">Noi dung</th>
            <th scope="col">Tien do</th>
            <th scope="col">
              <button class="btn btn-success" @click="addEvent">Them</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in customer.events" :key="event.id">
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
              <button class="btn btn-danger" @click="deleteEvent(event.id)">
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
import Datepicker from "@vuepic/vue-datepicker";
import store from "@/store";
import { useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { minValue, required, email } from "@vuelidate/validators";

export default {
  components: { Datepicker },
  setup() {
    /* Set up */
    const route = useRoute();
    let customer = reactive({
      id: -1,
      name: "",
      email: "",
      phone: "",
      age: 0,
      events: [],
    });
    if (route.params.id != "new") {
      customer = store.state.customers.find((customer) => {
        return customer.id == route.params.id;
      });
    } else {
      let length = store.state.customers.length;
      if (length > 0) {
        customer.id = store.state.customers[length - 1].id + 1;
      } else {
        customer.id = 0;
      }
    }
    console.log("This id is:", customer.id);
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

    /* EVENTS CRUD */
    // Add
    const addEvent = () => {
      if (!customer.events) customer.events = [];
      customer.events.push({ date: "", content: "", progress: "" });
      console.log(customer.events);
    };
    // Del
    const deleteEvent = (id) => {
      customer.events.splice(id, 1);
    };
    return { customer, addEvent, deleteEvent, format, v$, route };
  },
  validations() {
    return {
      customer: {
        name: { required },
        email: { required, email },
        age: { required, minValue: minValue(10) },
      },
    };
  },
  methods: {
    save() {
      // Validate the form
      this.v$.$validate();
      if (!this.v$.customer.$error) {
        if (this.route.params.id == "new") {
          if (this.customer.events)
            this.customer.events.forEach((event) => {
              event.date = event.date.toLocaleString();
            });
          store.commit("add_customer", { customer: this.customer });
        } else {
          this.customer.events.forEach((event) => {
            event.date = event.date.toLocaleString();
          });
          store.commit("edit_customer", {
            id: this.customer.id,
            customer: this.customer,
          });
          console.log(this.customer.id);
        }
        this.$router.back();
      }
    },
  },
  beforeCreate() {
    // If there is create customer: set the next id
    // else: get the current id
    // if (this.route.params.id != "new") {
    //   this.customer = store.state.customers.find((customer) => {
    //     return customer.id == this.route.params.id;
    //   });
    // } else {
    //   let length = store.state.customers.length;
    //   if (length > 0) {
    //     this.customer.id = store.state.customers[length - 1].id + 1;
    //   } else {
    //     this.customer.id = 0;
    //   }
    // }
    // console.log("This id is:", this.customer.id);
  },
};
</script>

<style></style>
