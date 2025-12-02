export interface IIpGeolocationResponse {
  status: 'success' | 'fail';
  message?: string;
  lat?: number;
  lon?: number;
  city?: string;
  country?: string;
  countryCode?: string;
  query?: string;
}

