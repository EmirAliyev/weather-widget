import { watch, type Ref } from 'vue';
import type { ICity, IConfigState, CityWeather } from '@/shared/model/types';
import { useCityAutocomplete } from '@/widgets/weather/model/composables/useCityAutocomplete';
import { useCityForm } from '@/widgets/weather/model/composables/useCityForm';
import { useCityList } from '@/widgets/weather/model/composables/useCityList';

export function useWeatherConfig(
  cities: Ref<ICity[]>,
  cityWeather: Ref<CityWeather>,
  persistToStorage: () => void,
  fetchAllWeather: () => void
): IConfigState {
  const autocomplete = useCityAutocomplete();
  const list = useCityList(cities, cityWeather, persistToStorage, fetchAllWeather);
  const form = useCityForm(
    cities,
    cityWeather,
    persistToStorage,
    () => {
      autocomplete.citySuggestions.value = [];
    }
  );

  watch(
    () => autocomplete.newCity.value,
    () => {
      form.clearError();
    }
  );

  const onAddCity = async (): Promise<void> => {
    try {
      await form.onAddCity(autocomplete.newCity.value);
      autocomplete.newCity.value = '';
    } catch {
      void 0;
    }
  };

  return {
    newCity: autocomplete.newCity,
    dragIndex: list.dragIndex,
    citySuggestions: autocomplete.citySuggestions,
    suggestLoading: autocomplete.suggestLoading,
    configError: form.configError,
    onAddCity,
    selectSuggestion: autocomplete.selectSuggestion,
    removeCity: list.removeCity,
    onDragStart: list.onDragStart,
    onDrop: list.onDrop
  };
}

