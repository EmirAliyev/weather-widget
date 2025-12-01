import type { Ref } from 'vue';
import type { ICity, CityWeather } from '@/shared/model/types';
import { weatherApi } from '@/shared/api';
import { TIMINGS } from '@/widgets/weather/model/lib/constants/timings';

import type { IWeatherData } from '@/shared/model/types';

export function useWeatherGeolocation(
  cities: Ref<ICity[]>,
  fetchCityByCoords: (latitude: number, longitude: number) => Promise<IWeatherData | null>,
  persistToStorage: () => void,
  cityWeather: Ref<CityWeather>,
  loading: Ref<boolean>
) {
  const initWithGeolocation = () => {
    if (!navigator.geolocation) {
      return;
    }
    loading.value = true;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const geocodeResults = await weatherApi.reverseGeocode(latitude, longitude, 1);

          if (geocodeResults && geocodeResults.length > 0) {
            const location = geocodeResults[0];
            const cityName = location.name;

            const weatherData = await weatherApi.getWeatherByCity(cityName);

            if (weatherData) {
              const cityObj: ICity = {
                id: cityName.toLowerCase().replace(/\s+/g, '-'),
                name: cityName
              };
              cities.value = [cityObj];
              persistToStorage();
              cityWeather.value = { [cityObj.id]: weatherData };
            }
          } else {
            const data = await fetchCityByCoords(latitude, longitude);
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
          }
        } catch {
          try {
            const data = await fetchCityByCoords(latitude, longitude);
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
          } catch (fallbackError) {
            void fallbackError;
          }
        } finally {
          loading.value = false;
        }
      },
      (error) => {
        void error;
        loading.value = false;
      },
      {
        enableHighAccuracy: true,
        timeout: TIMINGS.GEOLOCATION_TIMEOUT_MS,
        maximumAge: 0
      }
    );
  };

  return {
    initWithGeolocation
  };
}

