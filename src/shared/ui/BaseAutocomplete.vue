<script setup>
import BaseInput from '@/shared/ui/BaseInput.vue';
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';

const model = defineModel({
  type: String,
  default: ''
});

defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  suggestions: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select']);

const onSelect = (item) => {
  emit('select', item);
};
</script>

<template>
  <div class="base-autocomplete">
    <BaseInput
      v-model="model"
      class="base-autocomplete__input"
      type="text"
      :placeholder="placeholder"
    />

    <ul
      v-if="suggestions.length"
      class="base-autocomplete__list"
    >
      <li
        v-for="item in suggestions"
        :key="item.key"
        class="base-autocomplete__item"
        @click="() => onSelect(item)"
      >
        <span class="base-autocomplete__label">{{ item.label }}</span>
        <span
          v-if="item.meta"
          class="base-autocomplete__meta"
        >
          {{ item.meta }}
        </span>
      </li>
    </ul>

    <div
      v-else-if="loading"
      class="base-autocomplete__loading"
    >
      <BaseSpinner />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-autocomplete {
  width: 100%;
  position: relative;

  &__list {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 0.25rem);

    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 10rem; 
    overflow-y: auto;
    border-radius: 0.625rem;
    background: $color-neutral-50;
    border: 1px solid $color-neutral-border-150;
    z-index: 10;
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

  &__label {
    @include textBase(0.875rem, 500);
  }

  &__meta {
    @include textSmall($color-neutral-text-100);
  }

  &__loading {
    @include flexRow(center, center);
    
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 0.25rem);
    
    padding: 0.5rem;

    border-radius: 0.625rem;
    border: 1px solid $color-neutral-border-150;

    background: $color-neutral-50;
  }
}
</style>


