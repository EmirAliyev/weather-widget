import type { Ref } from 'vue';
import type { IWeatherData } from '@/shared/model/types/weather/api';
import type { CityWeather } from '@/shared/model/types/weather/city';

export interface IWeatherDataState {
  loading: Ref<boolean>;
  error: Ref<string>;
  cityWeather: Ref<CityWeather>;
  fetchCityByCoords: (lat: number, lon: number) => Promise<IWeatherData | null>;
  fetchAllWeather: () => Promise<void>;
}

