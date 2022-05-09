import { createStore } from "vuex";
import db from "@/db";

export default createStore({
  state: {
    due_date: [],
  },
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
      // eslint-disable-next-line no-unused-vars
      const { id, events, ..._customer_ } = payload.customer;
      db.Customers.add(_customer_).then((new_id) => {
        if (events) {
          // Add new dates
          for (let i = 0; i < events.length; i++) {
            let event = events[i];
            db.Events.update({ customer_id: new_id, ...event });
          }
        }
      });
    },
    edit_customer(state, payload) {
      // eslint-disable-next-line no-unused-vars
      const { id, events, ..._customer_ } = payload.customer;
      db.Customers.update(id, _customer_).then(() => {
        // Add new dates
        for (let i = 0; i < events.length; i++) {
          let event = events[i];
          db.Events.update({ customer_id: id, ...event });
        }
      });
      payload.deleted.forEach((id) => {
        db.Events.delete({ id: id }).then();
      });
      // const { id, ..._customer_ } = payload.customer;
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
      db.Events.add({ customer_id: payload.id, ...payload.event }).then();
    },
  },
  actions: {},
  modules: {},
});
