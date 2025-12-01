<script setup lang="ts">
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';

interface IProps {
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
  maxWidth?: string | number | null;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  loading: false,
  disabled: false,
  maxWidth: null,
  fullWidth: false
});

const buttonStyles = computed(() => {
  const styles = {};
  if (props.maxWidth) {
    const maxWidth = typeof props.maxWidth === 'number' 
      ? `${props.maxWidth}px` 
      : String(props.maxWidth).match(/^\d+$/) 
        ? `${props.maxWidth}px`
        : props.maxWidth;
    styles.maxWidth = maxWidth;
  }
  if (props.fullWidth) {
    styles.width = '100%';
  }
  return styles;
});

</script>

<template>
  <button
    class="base-button"
    :type="type"
    :disabled="disabled || loading"
    :style="buttonStyles"
  >
    <BaseSpinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  @include flexRow(center, center);

  width: 100%;
  height: 48px;

  padding: .5rem 1rem;
  
  background: $color-primary-200;
  color: $color-neutral-text-0;

  border-radius: 0.5rem;

  cursor: pointer;
  
  @include defaultTransition();
  
  &:hover:not(:disabled) {
    background: $color-primary-150;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
}
</style>
