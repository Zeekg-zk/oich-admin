<template>
  <div class="layoutContainer">
    <Nav />
    <div class="defaultLayoutStyle">
      <Nuxt />
    </div>
  </div>
</template>
<script>
export default { }
</script>
<style scoped>
.layoutContainer {
  height: 100%;
  width: 100%;
}
.defaultLayoutStyle {
  margin-top: 7vh;
}
</style>
