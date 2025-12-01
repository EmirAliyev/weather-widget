import { ref, watch, type Ref } from 'vue';
import { weatherApi } from '@/shared/api';
import type { ICitySuggestion } from '@/shared/model/types';
import { TIMINGS } from '@/widgets/weather/model/lib/constants/timings';

export interface ICityAutocompleteState {
  newCity: Ref<string>;
  citySuggestions: Ref<ICitySuggestion[]>;
  suggestLoading: Ref<boolean>;
  selectSuggestion: (item: ICitySuggestion) => void;
}

export function useCityAutocomplete(): ICityAutocompleteState {
  const newCity = ref('');
  const citySuggestions = ref<ICitySuggestion[]>([]);
  const suggestLoading = ref(false);
  let suggestTimer: ReturnType<typeof setTimeout> | null = null;

  const fetchCitySuggestions = async (): Promise<void> => {
    const query: string = newCity.value;
    if (!query || query.length < 2) {
      citySuggestions.value = [];
      return;
    }

    suggestLoading.value = true;
    try {
      citySuggestions.value = await weatherApi.searchCities(query, 5);
    } catch {
      citySuggestions.value = [];
    } finally {
      suggestLoading.value = false;
    }
  };

  const selectSuggestion = (item: ICitySuggestion): void => {
    newCity.value = item.label;
    citySuggestions.value = [];
  };

  watch(
    () => newCity.value,
    (value) => {
      if (suggestTimer) clearTimeout(suggestTimer);
      if (!value || value.length < 2) {
        citySuggestions.value = [];
        return;
      }
      suggestTimer = setTimeout(() => {
        fetchCitySuggestions();
      }, TIMINGS.CITY_SUGGESTION_DEBOUNCE_MS);
    }
  );

  return {
    newCity,
    citySuggestions,
    suggestLoading,
    selectSuggestion
  };
}

