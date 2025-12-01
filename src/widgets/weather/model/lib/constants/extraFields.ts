import type { IWeatherData } from '@/shared/model/types';

interface IWeatherExtraField {
  key: string;
  label: string;
  getValue: (weather: IWeatherData) => string;
}

export const WEATHER_EXTRA_FIELDS: IWeatherExtraField[] = [
  {
    key: 'humidity',
    label: 'Humidity',
    getValue: (weather: IWeatherData) => `${weather.main.humidity}%`
  },
  {
    key: 'wind',
    label: 'Wind',
    getValue: (weather: IWeatherData) => `${Math.round(weather.wind.speed)} m/s`
  },
  {
    key: 'pressure',
    label: 'Pressure',
    getValue: (weather: IWeatherData) => `${weather.main.pressure} hPa`
  }
];

