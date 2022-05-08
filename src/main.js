import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";

import "bootstrap/dist/css/bootstrap.min.css";
import "vue-select/dist/vue-select.css";
import "vue-toastification/dist/index.css";

createApp(App).use(store).use(router).use(Toast).mount("#app");
