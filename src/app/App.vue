<script setup>
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  width: 100%;
}

.app-container {
  @include flexRow(center, flex-start);

  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  
  padding: 1rem;


}
</style>
