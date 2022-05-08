import { createStore } from "vuex";
import db from "@/db";

export default createStore({
  getters: {
    // eslint-disable-next-line no-unused-vars
    get_customer: (state) => (id) => {
      return db.Customers.get_by_id(id);
    },
    get_all_customers() {
      return db.Customers.get_all();
    },
    get_all_events() {
      return db.Events.get_all();
    },

    get_all_identities() {
      return db.Customers.get_all("id", "name", "email");
    },
  },
  mutations: {
    add_customer(state, payload) {
      //seperate customer_info and event
      // eslint-disable-next-line no-unused-vars
      const { id, events, ..._customer_ } = payload.customer;
      db.Customers.add(_customer_).then(() => {
        // Paste every events to database
        if (events && events.length > 0)
          events.forEach((element) => {
            const _event_ = { customer_id: id[0], ...element };
            db.Events.add(_event_).then((value) => console.log(value));
          });
      });
    },
    edit_customer(state, payload) {
      // eslint-disable-next-line no-unused-vars
      const { id, events, ..._customer_ } = payload.customer;
      console.log(events);
      // const { id, ..._customer_ } = payload.customer;
      // db.Customers.update(id, _customer_).then((value) => console.log(value));
    },
    /**
     * Delete customer by ID
     * @param {*} state
     * @param {*} id
     */
    delete_customer(state, id) {
      return db.Customers.delete(id).then();
    },
    add_event(state, payload) {
      console.log(payload);
    },
  },
  actions: {},
  modules: {},
});
