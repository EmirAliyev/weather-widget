<script setup lang="ts">
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface IProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  disabled: false,
  loading: false,
  size: 'md'
});

const getSizeValue = (size: ButtonSize): string => {
  switch (size) {
    case 'sm':
      return '18px';
    case 'md':
      return '24px';
    case 'lg':
      return '32px';
    case 'xl':
      return '38px';
  }
};

const buttonStyles = computed(() => {
  const sizeValue = getSizeValue(props.size);
  return {
    width: sizeValue,
    height: sizeValue
  };
});
</script>

<template>
  <button
    class="base-button-round"
    :type="type"
    :disabled="disabled || loading"
    :style="buttonStyles"
  >
    <BaseSpinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<style scoped lang="scss">
.base-button-round {
  @include flexRow(center, center);

  background: $color-primary-200;

  border-radius: 62.5rem;
  color: $color-neutral-text-0;
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
