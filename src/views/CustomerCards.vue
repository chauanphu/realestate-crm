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
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <router-link
            :to="{ name: 'CustomerInfo', params: { id: customer.id } }"
            class="btn btn-primary me-2"
            >Chinh sua</router-link
          >
          <button href="#" class="btn btn-danger">Xoa</button>
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
    return { customers };
  },
};
</script>

<style></style>
