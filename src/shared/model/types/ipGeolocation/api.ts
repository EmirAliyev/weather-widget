export interface IIpGeolocationResponse {
  status?: 'success' | 'fail';
  message?: string;
  lat?: number;
  lon?: number;
  latitude?: number;
  longitude?: number;
  city?: string;
  country?: string;
  countryCode?: string;
  query?: string;
  error?: boolean;
  reason?: string;
}

