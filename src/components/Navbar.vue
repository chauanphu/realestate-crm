<template>
  <ul class="container mx-auto bg-white py-10 px-10 flex flex-row border-b-4">
    <li>
      <router-link to="/" class="p-3 text-blue-800">Home</router-link>
    </li>
    <li>
      <router-link to="./transaction" class="p-3 text-blue-800"
        >Lich su</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "Nav",
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
