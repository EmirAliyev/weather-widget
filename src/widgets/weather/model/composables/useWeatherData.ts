import { ref, type Ref } from 'vue';
import { weatherApi } from '@/shared/api';
import type { IWeatherData, ICity, CityWeather, IWeatherDataState } from '@/shared/model/types';

export function useWeatherData(cities: Ref<ICity[]>): IWeatherDataState {

  const loading = ref(false);
  const error = ref('');
  const cityWeather = ref<CityWeather>({});

  const fetchCityByCoords = async (lat: number, lon: number): Promise<IWeatherData | null> => {
    try {
      const data = await weatherApi.getWeatherByCoords(lat, lon);
      const cityName = data.name;
      if (!cityName) return null;
      return data;
    } catch (e: unknown) {
      const errorObj = e as Error;
      error.value = errorObj.message || 'Unable to get your location weather.';
      return null;
    }
  };

  const fetchAllWeather = async (): Promise<void> => {
    if (cities.value.length === 0) return;
    loading.value = true;
    error.value = '';
    try {
      const cityNames = cities.value.map(city => city.name);
      const results = await weatherApi.getWeatherForCities(cityNames);
      const mapping: CityWeather = {};
      results.forEach((data, index) => {
        const city = cities.value[index];
        mapping[city.id] = data;
      });
      cityWeather.value = mapping;
    } catch (e: unknown) {
      const errorObj = e as Error;
      error.value = errorObj.message || 'Failed to load weather.';
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    cityWeather,
    fetchCityByCoords,
    fetchAllWeather
  };
}

