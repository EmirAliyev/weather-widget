<script setup>
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';
import WeatherCity from '@/widgets/weather/ui/WeatherCity.vue';

defineProps({
  cities: {
    type: Array,
    default: () => []
  },
  cityWeather: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
});
</script>

<template>
  <section class="ww-main">
    <div v-if="loading" class="ww-state ww-state--loading">
      <BaseSpinner label="Loading weather..." />
    </div>
    <div v-else-if="error" class="ww-state ww-state--error">
      {{ error }}
    </div>
    <div v-else-if="cities.length === 0" class="ww-state">
      No cities selected yet. Click the gear to configure.
    </div>
    <ul v-else class="ww-cities">
      <WeatherCity
        v-for="city in cities"
        :key="city.id"
        :city="city"
        :weather="cityWeather[city.id]"
      />
    </ul>
  </section>
</template>

<style scoped lang="scss">
.ww-main {
  margin-top: 0.25rem;
}

.ww-state {
  @include textBase(0.875rem, 400, 1.4, $color-neutral-text-100);

  &--loading {
    color: $color-primary-200;
  }

  &--error {
    color: $color-danger-150;
  }
}

.ww-cities {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flexColumn(flex-start, flex-start, 0.625);
}
</style>


