import type { Ref } from 'vue';
import type { ICity, CityWeather } from '@/shared/model/types';

export interface ICityListState {
  dragIndex: Ref<number | null>;
  removeCity: (id: string) => void;
  onDragStart: (index: number, event: DragEvent) => void;
  onDrop: (index: number) => void;
}

export function useCityList(
  cities: Ref<ICity[]>,
  cityWeather: Ref<CityWeather>,
  persistToStorage: () => void,
  fetchAllWeather: () => void
): ICityListState {
  const dragIndex = ref<number | null>(null);

  const removeCity = (id: string): void => {
    cities.value = cities.value.filter((c) => c.id !== id);
    const copy = { ...cityWeather.value };
    delete copy[id];
    cityWeather.value = copy;
    persistToStorage();
  };

  const onDragStart = (index: number, event: DragEvent): void => {
    dragIndex.value = index;
    event.dataTransfer?.setData('text/plain', String(index));
  };

  const onDrop = (index: number): void => {
    const from = dragIndex.value;
    dragIndex.value = null;
    if (from === null || from === index) return;
    
    const updated = cities.value.slice();
    const [moved] = updated.splice(from, 1);
    updated.splice(index, 0, moved);
    cities.value = updated;
    persistToStorage();
    fetchAllWeather();
  };

  return {
    dragIndex,
    removeCity,
    onDragStart,
    onDrop
  };
}

