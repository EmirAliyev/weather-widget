import type { IWeatherData } from '@/shared/model/types/weather/api';

export interface ICity {
  name: string;
  id: string;
}

export type CityWeather = Record<string, IWeatherData>;

