import type { Ref } from 'vue';
import type { ICitySuggestion } from '@/shared/model/types/weather/api';

export interface IConfigState {
  newCity: Ref<string>;
  dragIndex: Ref<number | null>;
  citySuggestions: Ref<ICitySuggestion[]>;
  suggestLoading: Ref<boolean>;
  configError: Ref<string>;
  onAddCity: () => Promise<void>;
  selectSuggestion: (item: ICitySuggestion) => void;
  removeCity: (id: string) => void;
  onDragStart: (index: number, event: DragEvent) => void;
  onDrop: (index: number) => void;
}

