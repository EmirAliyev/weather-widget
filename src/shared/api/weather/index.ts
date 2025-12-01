import { OpenWeatherApi } from '@/shared/api/weather/openWeatherApi';
import type { IWeatherApi } from '@/shared/model/types';

export function createWeatherApi(apiKey: string, baseURL: string): IWeatherApi {
  if (!apiKey) {
    throw new Error('API key is required');
  }
  if (!baseURL) {
    throw new Error('Base URL is required');
  }
  return new OpenWeatherApi(apiKey, baseURL);
}

const apiKey: string | undefined = process.env.VUE_APP_OPENWEATHER_API_KEY;
const baseURL: string | undefined = process.env.VUE_APP_OPENWEATHER_API_URL;

export const weatherApi: IWeatherApi = (apiKey && baseURL
  ? createWeatherApi(apiKey, baseURL)
  : null) as IWeatherApi;

export type { IWeatherApi, IWeatherData, ICitySuggestion } from '@/shared/model/types';
