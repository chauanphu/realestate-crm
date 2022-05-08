<template>
  <div>
    <h3>{{ date }}</h3>
    <p>{{ name }}</p>
    <p>{{ content }}</p>
  </div>
  ,
</template>

<script>
export default {
  name: "Alarm",
  props: ["date", "name", "content"],
};
</script>

<style></style>
