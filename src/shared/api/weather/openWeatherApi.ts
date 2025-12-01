import { axiosInstance } from '@/app/api';
import type { AxiosResponse, AxiosError } from 'axios';
import type { IWeatherData, ICitySuggestion, IWeatherApi, IGeoDirectItem } from '@/shared/model/types';



export class OpenWeatherApi implements IWeatherApi {
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string, baseURL: string) {
    this.apiKey = apiKey;
    this.baseURL = baseURL || process.env.VUE_APP_OPENWEATHER_API_URL || '';
  }

  async getWeatherByCity(cityName: string): Promise<IWeatherData> {
    try {
      const response: AxiosResponse<IWeatherData> = await axiosInstance.get('/data/2.5/weather', {
        baseURL: this.baseURL,
        params: {
          q: cityName,
          units: 'metric',
          appid: this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error('City not found. Please check the name.');
      }
      throw error;
    }
  }

  async getWeatherByCoords(lat: number, lon: number): Promise<IWeatherData> {
    const response: AxiosResponse<IWeatherData> = await axiosInstance.get('/data/2.5/weather', {
      baseURL: this.baseURL,
      params: {
        lat,
        lon,
        units: 'metric',
        appid: this.apiKey
      }
    });
    return response.data;
  }

  async getWeatherForCities(cityNames: string[]): Promise<IWeatherData[]> {
    const requests = cityNames.map(cityName =>
      axiosInstance.get<IWeatherData>('/data/2.5/weather', {
        baseURL: this.baseURL,
        params: {
          q: cityName,
          units: 'metric',
          appid: this.apiKey
        }
      })
    );

    const responses = await Promise.all(requests);
    return responses.map((response: AxiosResponse<IWeatherData>) => response.data);
  }

  async searchCities(query: string, limit: number = 5): Promise<ICitySuggestion[]> {
    const response: AxiosResponse<IGeoDirectItem[]> = await axiosInstance.get('/geo/1.0/direct', {
      baseURL: this.baseURL,
      params: {
        q: query,
        limit,
        appid: this.apiKey
      }
    });

    return response.data.map((item: IGeoDirectItem) => ({
      key: `${item.name}-${item.lat}-${item.lon}-${item.country}`,
      label: item.name,
      meta: [item.state, item.country].filter(Boolean).join(', ')
    }));
  }

  async reverseGeocode(lat: number, lon: number, limit: number = 1): Promise<IGeoDirectItem[]> {
    const response: AxiosResponse<IGeoDirectItem[]> = await axiosInstance.get('/geo/1.0/reverse', {
      baseURL: this.baseURL,
      params: {
        lat,
        lon,
        limit,
        appid: this.apiKey
      }
    });
    return response.data;
  }
}

