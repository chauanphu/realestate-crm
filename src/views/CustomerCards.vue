<template>
  <div class="container-fluid px-4">
    <router-link
      :to="{ name: 'CustomerInfo', params: { id: 'new' } }"
      class="btn btn-success mb-4"
      >Them</router-link
    >
    <div class="row row-cols-4">
      <div class="card col" v-for="customer in customers" :key="customer.id">
        <div class="card-header">{{ customer.name }}</div>
        <div class="card-body">
          <div v-if="customer.events.length > 0">
            <h5 class="card-title">
              {{ upcoming_event(customer.events).date }}
            </h5>
            <p class="card-text">
              {{ upcoming_event(customer.events).content }}
            </p>
          </div>
          <div v-else>
            <p class="card-title">Chua co lich hen</p>
          </div>
          <div class="card-action mt-2">
            <router-link
              :to="{ name: 'CustomerInfo', params: { id: customer.id } }"
              class="btn btn-primary me-2"
              >Chinh sua</router-link
            >
            <button
              @click="delete_customer(customer.id)"
              class="btn btn-danger"
            >
              Xoa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  setup() {
    const customers = store.state.customers;

    const upcoming_event = (events) => {
      if (!events || events.length == 0) {
        return { date: "", content: "" };
      }
      // If there is 1 event, return it
      if (events.length == 1) {
        return events[0];
      }
      // If there is multiple events, return the upcoming
      let newest = [...events];
      newest.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      return newest[0];
    };
    const delete_customer = (id) => {
      console.log(id);
      store.commit("delete_customer", id);
    };
    return { customers, delete_customer, upcoming_event };
  },
};
</script>

<style></style>
