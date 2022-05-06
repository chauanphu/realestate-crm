import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      customers: [
        {
          id: 0,
          name: "Chau An Phu",
          email: "chauanphu@gmail.com",
          phone: "0927933864",
          age: 18,
          events: [],
        },
      ],
    };
  },
  mutations: {},
  actions: {},
  modules: {},
});
