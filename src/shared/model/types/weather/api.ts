export interface IWeatherCoord {
  lon: number;
  lat: number;
}

export interface IWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface IWeatherClouds {
  all: number;
}

export interface IWeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface IWeatherData {
  base: string;
  clouds: IWeatherClouds;
  cod: number;
  coord: IWeatherCoord;
  dt: number;
  id: number;
  main: IWeatherMain;
  name: string;
  sys: IWeatherSys;
  timezone: number;
  visibility: number;
  weather: IWeatherCondition[];
  wind: IWeatherWind;
}

export interface IGeoDirectItem {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface ICitySuggestion {
  key: string;
  label: string;
  meta: string;
}

export interface IWeatherApi {
  getWeatherByCity(cityName: string): Promise<IWeatherData>;
  getWeatherByCoords(lat: number, lon: number): Promise<IWeatherData>;
  getWeatherForCities(cityNames: string[]): Promise<IWeatherData[]>;
  searchCities(query: string, limit?: number): Promise<ICitySuggestion[]>;
  reverseGeocode(lat: number, lon: number, limit?: number): Promise<IGeoDirectItem[]>;
}

