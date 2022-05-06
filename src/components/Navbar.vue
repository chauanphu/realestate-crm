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
  </nav>
</template>

<script>
export default {
  name: "Navbar",
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
</style>
