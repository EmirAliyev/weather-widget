import { IpGeolocationApi } from './ipApi';

export { IpGeolocationApi };

const baseURL: string | undefined = process.env.VUE_APP_IP_GEOLOCATION_BASE_URL;

export const ipGeolocationApi = new IpGeolocationApi(baseURL);

