<script setup>
const model = defineModel({
  type: [String, Number],
  default: ''
});

defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['blur', 'focus']);
</script>

<template>
  <input
    class="base-input"
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    @blur="(e) => emit('blur', e)"
    @focus="(e) => emit('focus', e)"
  />
</template>

<style scoped lang="scss">
.base-input {
  width: 100%;
  height: 48px;

  border-radius: .5rem;
  border: 1px solid $color-neutral-border-150;

  padding: 0.375rem 0.625rem;
  
  background: $color-neutral-50;
  color: $color-neutral-text-0;
  outline: none;

  @include defaultTransition();

  &::placeholder {
    color: $color-neutral-text-100;
  }

  &:focus {
    border-color: $color-primary-200;
    box-shadow: 0 0 0 0.0625rem rgba(66, 153, 225, 0.5);
  }
}
</style>
