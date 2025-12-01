import { storageAdapter } from '@/shared/model/lib/storage';
import { WEATHER_STORAGE_KEY } from '@/widgets/weather/model/lib/constants/storage';
import type { ICitiesState, ICity } from '@/shared/model/types';

export function useWeatherStorage(): ICitiesState {

  const cities = ref<ICity[]>([]);

  const restoreFromStorage = (): void => {
    const raw: string | null | undefined = storageAdapter.get(WEATHER_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        cities.value = parsed as ICity[];
      }
    } catch (e: unknown) {
      void e;
    }
  };

  const persistToStorage = (): void => {
    storageAdapter.set(WEATHER_STORAGE_KEY, JSON.stringify(cities.value));
  };

  return {
    cities,
    restoreFromStorage,
    persistToStorage
  };
}

