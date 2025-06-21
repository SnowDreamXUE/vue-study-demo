<template>
  <div id="app">
    <FlyingLines/>
    <router-view></router-view>
  </div>
</template>

<script>
import FlyingLines from "@/components/FlyingLines.vue";
export default {
  name: 'app',
  components: {
    FlyingLines
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>
