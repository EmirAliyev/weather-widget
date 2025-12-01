import { ref, type Ref } from 'vue';
import { weatherApi } from '@/shared/api';
import type { ICity, CityWeather } from '@/shared/model/types';
import { ConfigErrorMessages } from '@/widgets/weather/model/lib/constants/error-config';

export interface ICityFormState {
  configError: Ref<string>;
  onAddCity: (cityName: string) => Promise<void>;
  clearError: () => void;
}

export function useCityForm(
  cities: Ref<ICity[]>,
  cityWeather: Ref<CityWeather>,
  persistToStorage: () => void,
  clearSuggestions: () => void
): ICityFormState {
  const configError = ref('');

  const clearError = (): void => {
    configError.value = '';
  };

  const onAddCity = async (cityName: string): Promise<void> => {
    configError.value = '';
    clearSuggestions();

    if (!cityName) {
      configError.value = ConfigErrorMessages.EMPTY_CITY_NAME;
      return;
    }

    const id = cityName.toLowerCase();
    if (cities.value.some((c) => c.id === id)) {
      configError.value = ConfigErrorMessages.CITY_ALREADY_EXISTS;
      return;
    }

    try {
      const data = await weatherApi.getWeatherByCity(cityName);
      const cityNameFromApi = data.name || cityName;
      const cityObj = { id: cityNameFromApi.toLowerCase(), name: cityNameFromApi };
      cities.value.push(cityObj);
      persistToStorage();
      cityWeather.value = { ...cityWeather.value, [cityObj.id]: data } as CityWeather;
    } catch (e: unknown) {
      const error = e as Error;
      configError.value = error.message || ConfigErrorMessages.VALIDATION_FAILED;
      throw error;
    }
  };

  return {
    configError,
    onAddCity,
    clearError
  };
}

