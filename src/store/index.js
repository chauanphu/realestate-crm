import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      customers: [{ id: 0, name: "Chau An Phu", email: "chauanphu@gmail.com" }],
    };
  },
  mutations: {},
  actions: {},
  modules: {},
});
