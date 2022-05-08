import { createStore } from "vuex";
import db from "@/db";

console.log();

export default createStore({
  getters: {
    get_all_customers() {
      return db.Customers.get_all();
    },
    get_all_events() {
      // let events = [];

      // for (let i = 0; i < state.customers.length; i++) {
      //   let customer = state.customers[i];
      //   if (customer.events !== undefined) {
      //     for (let h = 0; h < customer.events.length; h++) {
      //       let event = customer.events[h];
      //       let item = {
      //         id: customer.id,
      //         name: customer.name,
      //         email: customer.email,
      //         event: event,
      //       };
      //       events.push(item);
      //     }
      //   }
      // }

      // // If there is multiple events, return the upcoming
      // events.sort((a, b) => {
      //   return new Date(a.date) - new Date(b.date);
      // });
      // return events;
      return db.Events.get_all();
    },

    get_all_identities() {
      // let identity = state.customers.map((customer) => {
      //   return { id: customer.id, name: customer.name, email: customer.email };
      // });
      return db.Customers.get_all("id", "name", "email");
    },
  },
  mutations: {
    add_customer(state, payload) {
      state.customers.push(payload.customer);
    },
    edit_customer(state, payload) {
      let index = state.customers.findIndex((customer) => {
        return customer.id == payload.id;
      });
      state.customers[index] = payload.customer;
    },
    /**
     * Delete customer by ID
     * @param {*} state
     * @param {*} id
     */
    delete_customer(state, id) {
      let index = state.customers.findIndex((customer) => {
        return customer.id == id;
      });
      if (index > -1) state.customers.splice(index, 1);
    },
    add_event(state, payload) {
      let index_customer = state.customers.findIndex((customer) => {
        return customer.id == payload.id;
      });
      console.log(index_customer);
      state.customers[index_customer].events.push(payload.event);
      console.log(state.customers);
    },
  },
  actions: {},
  modules: {},
});
