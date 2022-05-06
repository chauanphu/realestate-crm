<template>
  <div class="container-fluid px-4">
    <router-link to="/cards" class="btn btn-primary mb-4">Save</router-link>
    <div class="row">
      <div class="col-4">
        <form>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Ho va Ten</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="customer.name"
            />
          </div>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="customer.email"
            />
          </div>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">SDT</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="customer.phone"
            />
          </div>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Tuoi</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="customer.age"
            />
          </div>
        </form>
      </div>
      <div class="col-8">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Lich hen sap toi</th>
              <th scope="col">Noi dung</th>
              <th scope="col">
                <button class="btn btn-success" @click="addEvent">Them</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in customer.events" :key="event.id">
              <td class="w-25"><Datepicker v-model="event.date" /></td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  aria-label="default input example"
                  v-model="event.content"
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
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import store from "@/store";
import { useRoute } from "vue-router";
import { reactive } from "@vue/reactivity";

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
    if (route.params.id != "new") {
      customer = store.state.customers.find((customer) => {
        return customer.id == route.params.id;
      });
    }

    const addEvent = () => {
      console.log(customer);
      customer.events.push({ date: "", content: "" });
    };
    const deleteEvent = (id) => {
      customer.events.splice(id, 1);
    };
    return { customer, addEvent, deleteEvent };
  },
};
</script>

<style></style>
