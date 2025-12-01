import type { Ref } from 'vue';
import type { ICitySuggestion } from '@/shared/model/types/weather/api';
import type { ICity, CityWeather } from '@/shared/model/types/weather/city';

export interface IWeatherWidgetState {
  isConfig: Ref<boolean>;
  loading: Ref<boolean>;
  error: Ref<string>;
  configError: Ref<string>;
  cities: Ref<ICity[]>;
  cityWeather: Ref<CityWeather>;
  newCity: Ref<string>;
  citySuggestions: Ref<ICitySuggestion[]>;
  suggestLoading: Ref<boolean>;
  toggleConfig: () => void;
  onAddCity: () => Promise<void>;
  selectSuggestion: (item: ICitySuggestion) => void;
  removeCity: (id: string) => void;
  onDragStart: (index: number, event: DragEvent) => void;
  onDrop: (index: number) => void;
  initialize: () => void;
}

