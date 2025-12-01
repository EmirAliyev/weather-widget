import type { Ref } from 'vue';
import type { ICity } from '@/shared/model/types/weather/city';

export interface ICitiesState {
  cities: Ref<ICity[]>;
  restoreFromStorage: () => void;
  persistToStorage: () => void;
}

