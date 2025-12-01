import { useWeatherStorage } from '@/widgets/weather/model/composables/useWeatherStorage';
import { useWeatherData } from '@/widgets/weather/model/composables/useWeatherData';
import { useWeatherConfig } from '@/widgets/weather/model/composables/useWeatherConfig';
import { useWeatherGeolocation } from '@/widgets/weather/model/composables/useWeatherGeolocation';
import type { IWeatherWidgetState } from '@/shared/model/types';

export function useWeatherWidget(): IWeatherWidgetState {
  const storage = useWeatherStorage();
  const data = useWeatherData(storage.cities);
  const config = useWeatherConfig(storage.cities, data.cityWeather, storage.persistToStorage, data.fetchAllWeather);
  const geolocation = useWeatherGeolocation(storage.cities, data.fetchCityByCoords, storage.persistToStorage, data.cityWeather, data.loading);

  const isConfig = ref(false);

  const toggleConfig = (): void => {
    isConfig.value = !isConfig.value;
    config.configError.value = '';
  };

  const initialize = (): void => {
    storage.restoreFromStorage();
    if (storage.cities.value.length === 0) {
      geolocation.initWithGeolocation();
    } else {
      data.fetchAllWeather();
    }
  };

  return {
    isConfig,
    loading: data.loading,
    error: data.error,
    configError: config.configError,
    cities: storage.cities,
    cityWeather: data.cityWeather,
    newCity: config.newCity,
    citySuggestions: config.citySuggestions,
    suggestLoading: config.suggestLoading,
    toggleConfig,
    onAddCity: config.onAddCity,
    selectSuggestion: config.selectSuggestion,
    removeCity: config.removeCity,
    onDragStart: config.onDragStart,
    onDrop: config.onDrop,
    initialize
  };
}

