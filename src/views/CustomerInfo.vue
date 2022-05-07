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
          required
        />
      </div>
      <div class="form-group mb-2 col">
        <label for="exampleFormControlInput1">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          v-model="customer.email"
          required
        />
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
          <tr v-for="(event, index) in customer.events" :key="event.id">
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
import Datepicker from "@vuepic/vue-datepicker";
import store from "@/store";
import { useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";

export default {
  components: { Datepicker },
  setup() {
    // Set up
    const route = useRoute();
    let customer = reactive({
      id: 0,
      name: "",
      email: "",
      phone: "",
      age: 0,
      events: [],
    });
    //Format date picker
    let format = ref(new Date());
    format = (date) => {
      // const day = date.getDate();
      // const month = date.getMonth() + 1;
      // const year = date.getFullYear();
      // const hour = date.getHours();
      // const minute = date.getMinutes();
      // return new Date(`${day}/${month}/${year} ${hour}:${minute}`);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hour = date.getHours();
      const minute = date.getMinutes();

      return `${day}/${month}/${year} ${hour}:${minute}`;
    };

    // If there is create customer: set the next id
    // else: get the current id
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

    /* EVENTS CRUD */
    // Add
    const addEvent = () => {
      customer.events.push({ date: "", content: "", progress: "" });
    };
    // Del
    const deleteEvent = (id) => {
      customer.events.splice(id, 1);
    };
    const save = () => {
      if (route.params.id == "new") {
        customer.events.forEach((event) => {
          event.date = event.date.toLocaleString();
        });
        store.commit("add_customer", { customer: customer });
      } else {
        customer.events.forEach((event) => {
          event.date = event.date.toLocaleString();
        });
        store.commit("edit_customer", { id: customer.id, customer: customer });
      }
    };
    return { customer, addEvent, deleteEvent, save, format };
  },
};
</script>

<style></style>
