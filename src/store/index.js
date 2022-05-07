import { createStore } from "vuex";

export default createStore({
  state: {
    customers: [
      { id: 0, name: "A", email: "a@a.com", age: 25, events: [] },
      { id: 1, name: "B", email: "b@b.com", age: 18, events: [] },
    ],
  },
  getters: {
    get_all_customers(state) {
      return state.customers;
    },
    get_all_events(state) {
      let events = [];

      for (let i = 0; i < state.customers.length; i++) {
        let customer = state.customers[i];
        if (customer.events !== undefined) {
          for (let h = 0; h < customer.events.length; h++) {
            let event = customer.events[h];
            let item = {
              name: customer.name,
              email: customer.email,
              event: event,
            };
            events.push(item);
          }
        }
      }

      // If there is multiple events, return the upcoming
      events.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return events;
    },

    get_all_identities(state) {
      let identity = state.customers.map((customer) => {
        return { id: customer.id, name: customer.name, email: customer.email };
      });
      return identity;
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
      // let index_date = state.customers[index_customer].events.findIndex((event) => {
      //   return event.date == payload.date;
      // });
      // state.customers[index_customer].events[index_date].date = payload
    },
  },
  actions: {},
  modules: {},
});
