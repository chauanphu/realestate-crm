<template>
  <nav class="navbar navbar-expand-lg navbar-light px-2 mb-4 bg-light">
    <ul class="navbar-nav d-flex justify-content-end">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Lich hen</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cards" class="nav-link">Khach hang</router-link>
      </li>
    </ul>
    <button
      @click="clear_due"
      id="notification"
      type="button"
      class="btn btn-primary rounded-circle position-absolute right"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-bell mb-1"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
        />
      </svg>
      <span
        v-if="
          alarm_list.filter((element) => {
            return !element.alarmed;
          }).length > 0
        "
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        {{
          alarm_list.filter((element) => {
            return !element.alarmed;
          }).length
        }}
      </span>
    </button>
  </nav>
</template>

<script>
import store from "@/store";
import { useToast, POSITION } from "vue-toastification";
import { ref } from "@vue/reactivity";

export default {
  name: "Navbar",
  setup() {
    const toast = useToast();
    const alarm_list = ref([]);
    const alarm_check = () => {
      store.getters.get_all_events.then((events) => {
        events.forEach((event) => {
          console.log(event.date);
          if (new Date(event.date) <= new Date()) {
            // Only added when there aren't existing event in list
            let check = alarm_list.value.find((element) => {
              return element.event_id == event.event_id;
            });
            if (check === undefined) {
              alarm_list.value.push({ ...event, alarmed: false });
            }
          }
        });
      });
    };
    const clear_due = () => {
      alarm_list.value.forEach((element) => {
        // If found unalarmed event
        if (!element.alarmed) {
          element.alarmed = true;
          let content = `${element.date}\n${element.name}\n${element.content}`;
          toast.info(content, {
            timeout: false,
            position: POSITION.BOTTOM_RIGHT,
          });
        }
      });
    };
    setInterval(alarm_check, 1000);
    return { alarm_list, clear_due };
  },
};
</script>

<style scoped>
.router-link-active {
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-width: 2px;
}
#notification {
  right: 2em;
}
</style>
