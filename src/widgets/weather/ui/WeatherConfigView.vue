<script setup lang="ts">
import CityAutocomplete from '@/widgets/weather/ui/CityAutocomplete.vue';
import WeatherConfigItem from '@/widgets/weather/ui/WeatherConfigItem.vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import { ICity, ICitySuggestion } from '@/shared/model/types';

interface IProps {
  cities?: ICity[];
  citySuggestions?: ICitySuggestion[];
  suggestLoading?: boolean;
  configError?: string;
  newCity?: string;
  removeCity: (id: string) => void;
  onDragStart: (index: number, event: DragEvent) => void;
  onDrop: (index: number) => void;
}

const props = withDefaults(defineProps<IProps>(), {
  cities: () => [],
  citySuggestions: () => [],
  suggestLoading: false,
  configError: '',
  newCity: ''
});

const emit = defineEmits<{
  (e: 'update:newCity', value: string): void;
  (e: 'add-city'): void;
  (e: 'select-suggestion', item: ICitySuggestion): void;
}>();

const newCityModel = computed({
  get: () => props.newCity,
  set: (value: string) => emit('update:newCity', value)
});
</script>

<template>
  <section class="ww-config">
    <div class="ww-config__section">
      <h3 class="ww-config__title">
        Your cities
      </h3>
      <div
        v-if="cities.length === 0"
        class="ww-state"
      >
        No cities yet. Add one below.
      </div>
      <div class="ww-config-list">
        <WeatherConfigItem
          v-for="(city, index) in cities"
          :key="city.id"
          :city="city"
          :index="index"
          :on-drag-start="onDragStart"
          :on-drop="onDrop"
          :on-remove="removeCity"
        />
      </div>
    </div>

    <div class="ww-config__section">
      <h3 class="ww-config__title">
        Add city
      </h3>
      <div class="ww-add-form">
        <CityAutocomplete
          v-model="newCityModel"
          :suggestions="citySuggestions"
          :loading="suggestLoading"
          placeholder="Enter city name (e.g. London)"
          @select="(item: ICitySuggestion) => emit('select-suggestion', item)"
        />
        <BaseButton
          max-width="90"
          @click="emit('add-city')"
        >
          Add
        </BaseButton>
      </div>
      <p
        v-if="configError"
        class="ww-config__error"
      >
        {{ configError }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ww-config {
  @include flexColumn(flex-start, flex-start, 0.75);
  
  margin-top: 0.375rem;
}

.ww-config__section {
  width: 100%;
  
  padding: 0.5rem 0.625rem;

  border-radius: 0.75rem;

  background: $color-neutral-100;
}

.ww-config__title {
  @include headingSmall($color-neutral-text-100);

  margin: 0 0 0.375rem;
}

.ww-config-list {
  @include flexRow(flex-start, flex-start, 0.375, wrap);
}


.ww-add-form {
  @include flexRow(center, flex-start, 0.375);
}

.ww-add-form__button {
  flex: 0 0 auto;

  padding: 0 0.875rem;

  @include textBase(0.875rem, 500, 1.4, $color-neutral-text-0);
  white-space: nowrap;
}

.ww-config__error {
  @include textSmall($color-danger-150);

  margin-top: 0.25rem;
}
</style>
