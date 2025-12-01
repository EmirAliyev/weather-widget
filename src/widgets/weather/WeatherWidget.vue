<script setup>
import WeatherHeader from '@/widgets/weather/ui/WeatherHeader.vue';
import WeatherCitiesView from '@/widgets/weather/ui/WeatherCitiesView.vue';
import WeatherConfigView from '@/widgets/weather/ui/WeatherConfigView.vue';
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';
import { useWeatherWidget } from '@/widgets/weather/model/composables/useWeatherMain';

const {
  isConfig,
  loading,
  error,
  cities,
  cityWeather,
  newCity,
  citySuggestions,
  suggestLoading,
  configError,
  toggleConfig,
  onAddCity,
  selectSuggestion,
  removeCity,
  onDragStart,
  onDrop,
  initialize
} = useWeatherWidget();

const initialLoading = ref(true);

onMounted(() => {
  initialize();
});

watch([loading, cities], () => {
  if (!loading.value && (cities.value.length > 0 || error.value)) {
    initialLoading.value = false;
  }
}, { immediate: true });
</script>

<template>
  <div class="ww-root" >
    <div v-if="initialLoading" class="ww-loading">
      <BaseSpinner label="Loading weather widget..." />
    </div>
    <template v-else>
      <WeatherHeader :is-config="isConfig" @toggle-config="toggleConfig" />

      <WeatherCitiesView
        v-if="!isConfig"
        :cities="cities"
        :city-weather="cityWeather"
        :loading="loading"
        :error="error"
      />

      <WeatherConfigView
        v-else
        :cities="cities"
        :city-suggestions="citySuggestions"
        :suggest-loading="suggestLoading"
        :config-error="configError"
        :new-city="newCity"
        :remove-city="removeCity"
        :on-drag-start="onDragStart"
        :on-drop="onDrop"
        @update:new-city="newCity = $event"
        @add-city="onAddCity"
        @select-suggestion="selectSuggestion"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.ww-root {
  max-width: 768px;
  width: 100%;

  padding: 1rem;
  margin: auto;

  background: $color-neutral-150;
  color: $color-neutral-text-0;

  border-radius: 1rem;

  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.3);
}

.ww-loading {
  @include flexRow(center, center);

  min-height: 10rem;
  
  padding: 2rem;
}
</style>