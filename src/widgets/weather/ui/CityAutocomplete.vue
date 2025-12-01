<script setup>
import BaseAutocomplete from '@/shared/ui/BaseAutocomplete.vue';

const model = defineModel({
  type: String,
  default: ''
});

defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  suggestions: Array,
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['input', 'select']);

</script>

<template>
  <div class="city-autocomplete">
    <BaseAutocomplete
      v-model="model"
      :placeholder="placeholder"
      :suggestions="suggestions"
      :loading="loading"
      @select="(item) => emit('select', item)"
    />
  </div>
</template>

<style scoped lang="scss">
.city-autocomplete {
  width: 100%;

  &__list {
    max-height: 9.375rem;

    margin: 0.375rem 0 0;
    padding: 0;

    border-radius: 0.5rem;
    border: 1px solid $color-neutral-border-150;

    background: $color-neutral-50;

    overflow-y: auto;
  }

  &__item {
    @include textSmall();
    @include flexRow(center, space-between, 0.5);

    padding: 0.375rem 0.625rem;

    cursor: pointer;
    @include defaultTransition(background-color);

    &:hover {
      background: $color-neutral-100;
    }
  }

  &__name {
    @include textBase(0.875rem, 500);
  }

  &__meta {
    @include textSmall($color-neutral-text-100);
  }

  &__loading {
    @include textSmall($color-neutral-text-100);
    
    margin-top: 0.25rem;
  }
}
</style>


