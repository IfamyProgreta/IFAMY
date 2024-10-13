<!--
* @Component: 
* @Maintainer: Adamy
* @Description: 
-->
<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: "Adamy",
  },
});
</script>

<template>
  <div class="">
    {{ name }}
  </div>
</template>

<style scoped lang="scss"></style>
