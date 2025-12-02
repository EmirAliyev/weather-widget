import type { Ref } from 'vue';
import type { ICity, CityWeather } from '@/shared/model/types';
import { weatherApi, ipGeolocationApi } from '@/shared/api';

import type { IWeatherData } from '@/shared/model/types';

export function useWeatherGeolocation(
  cities: Ref<ICity[]>,
  fetchCityByCoords: (latitude: number, longitude: number) => Promise<IWeatherData | null>,
  persistToStorage: () => void,
  cityWeather: Ref<CityWeather>,
  loading: Ref<boolean>,
  error: Ref<string>
) {
  const initWithGeolocation = async () => {
    loading.value = true;
    error.value = '';

    try {
      const location = await ipGeolocationApi.getLocationByIp();
      const { lat, lon, city: ipCity } = location;

      if (ipCity) {
        try {
          const weatherData = await weatherApi.getWeatherByCity(ipCity);
          if (weatherData) {
            const cityObj: ICity = {
              id: ipCity.toLowerCase().replace(/\s+/g, '-'),
              name: ipCity
            };
            cities.value = [cityObj];
            persistToStorage();
            cityWeather.value = { [cityObj.id]: weatherData };
            loading.value = false;
            return;
          }
        } catch {
          void 0;
        }
      }

      const data = await fetchCityByCoords(lat, lon);
      if (data) {
        const cityName = data.name;
        const cityObj: ICity = {
          id: cityName.toLowerCase().replace(/\s+/g, '-'),
          name: cityName
        };
        cities.value = [cityObj];
        persistToStorage();
        cityWeather.value = { [cityObj.id]: data };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to get your location.';
      error.value = errorMessage;
    } finally {
      loading.value = false;
    }
  };

  return {
    initWithGeolocation
  };
}

