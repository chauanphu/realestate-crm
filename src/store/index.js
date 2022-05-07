import { createStore } from "vuex";

export default createStore({
  state: {
    customers: [],
  },
  getters: {
    get_all_events(state) {
      let events = [];
      for (let i = 0; i < state.customers.length; i++) {
        let customer = state.customers[i];
        for (let h = 0; h < customer.events.length; h++) {
          let event = customer.events[h];
          let item = {
            name: customer.name,
            email: customer.email,
            date: event.date,
            content: event.content,
            progress: event.progress,
          };
          events.push(item);
        }
      }

      // If there is multiple events, return the upcoming
      events.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      console.log(events);
      return events;
    },
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
