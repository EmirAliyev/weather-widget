<script setup lang="ts">
interface IProps {
  label?: string;
}

withDefaults(defineProps<IProps>(), {
  label: ''
});
</script>

<template>
  <div class="base-spinner">
    <span class="base-spinner__icon" />
    <span
      v-if="label"
      class="base-spinner__label"
    >
      {{ label }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.base-spinner {
  @include flexRow(center, center, 0.5);
  @include textBase(0.875rem, 400, 1.4, $color-neutral-text-100);

  &__icon {
    width: 1rem;
    height: 1rem;

    border-radius: 62.5rem;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-top-color: $color-primary-200;

    animation: base-spinner-spin 0.7s linear infinite;
  }

  &__label {
    white-space: nowrap;
  }
}

@keyframes base-spinner-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
