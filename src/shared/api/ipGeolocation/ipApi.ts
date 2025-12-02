import axios from 'axios';
import type { IIpGeolocationResponse } from '@/shared/model/types';

export class IpGeolocationApi {
  private readonly baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.VUE_APP_IP_GEOLOCATION_BASE_URL || 'https://ipapi.co';
  }

  async getLocationByIp(query?: string): Promise<{ lat: number; lon: number; city?: string }> {
    try {
      const path = query ? `/${query}/json` : '/json';
      const url = `${this.baseURL}${path}`;

      const response = await axios.get<IIpGeolocationResponse>(url, {
        timeout: 10000
      });

      const data = response.data;

      if (data.status === 'fail') {
        throw new Error(data.message || 'Failed to get location by IP');
      }

      if (!data.lat || !data.lon) {
        throw new Error('Location coordinates not available');
      }

      return {
        lat: data.lat,
        lon: data.lon,
        city: data.city
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message || 'Failed to get location by IP');
      }
      throw error;
    }
  }
}

