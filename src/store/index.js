import { createStore } from "vuex";

export default createStore({
  state: {
    customers: [],
  },
  mutations: {
    add_customer(state, payload) {
      state.customers.push(payload.customer);
    },
    edit_customer(state, payload) {
      let index = state.customers.findIndex((customer) => {
        return (customer.id = payload.id);
      });
      state.customers[index] = payload.customer;
    },
    delete_customer(state, id) {
      let index = state.customers.findIndex((customer) => {
        return (customer.id = id);
      });
      state.customers.splice(index, 1);
    },
  },
  actions: {},
  modules: {},
});
