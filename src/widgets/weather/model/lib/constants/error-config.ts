export enum ConfigErrorMessages {
  EMPTY_CITY_NAME = 'Please enter a city name.',
  CITY_ALREADY_EXISTS = 'This city is already in the list.',
  VALIDATION_FAILED = 'Failed to validate city. Try again.'
}

export enum GeolocationErrorCode {
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3
}

export const GEOLOCATION_ERROR_MESSAGES: Record<GeolocationErrorCode, string> = {
  [GeolocationErrorCode.PERMISSION_DENIED]: 'Location access denied. Please enable location permissions or add a city manually.',
  [GeolocationErrorCode.POSITION_UNAVAILABLE]: 'Location information is unavailable.',
  [GeolocationErrorCode.TIMEOUT]: 'Location request timed out.'
} as const;

export const DEFAULT_GEOLOCATION_ERROR = 'Unable to get your location.';

