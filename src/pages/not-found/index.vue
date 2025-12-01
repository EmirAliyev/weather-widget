<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from '@/shared/ui/BaseButton.vue';

const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <BaseButton @click="goBack">
      Go Back
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  @include flexColumn(center, center, 1rem);
  margin: 0 auto;
  min-height: 50vh;
  text-align: center;
}
</style>
