<script setup>
import { WEATHER_EXTRA_FIELDS } from '@/widgets/weather/model/lib/constants/extraFields';
import { formatTemp, formatTime, getIconUrl } from '@/widgets/weather/model/lib/helpers/formatting';

defineProps({
  city: {
    type: Object,
    required: true
  },
  weather: {
    type: Object,
    default: null
  }
});
</script>

<template>
  <li class="ww-city">
    <div class="ww-city__header">
      <div class="ww-city__title-block">
        <div class="ww-city__name">{{ city.name }}</div>
        <div
          v-if="weather"
          class="ww-city__time"
        >
          {{ formatTime(weather) }}
          ·
          <span class="ww-city__condition">
            {{ weather.weather?.[0]?.description || '—' }}
          </span>
        </div>
      </div>
      <div
        v-if="weather"
        class="ww-city__temp-block"
      >
        <img
          v-if="getIconUrl(weather)"
          :src="getIconUrl(weather)"
          alt="Weather icon"
          class="ww-city__icon"
        />
        <div class="ww-city__temp-main">
          <span class="ww-city__temp">
            {{ formatTemp(weather.main.temp) }}
          </span>
          <span class="ww-city__feels">
            Feels like
            {{ formatTemp(weather.main.feels_like) }}
          </span>
        </div>
      </div>
    </div>
    <div
      v-if="weather"
      class="ww-city__extra"
    >
      <span
        v-for="field in WEATHER_EXTRA_FIELDS"
        :key="field.key"
        class="ww-city__extra-item"
      >
        {{ field.label }}: {{ field.getValue(weather) }}
      </span>
    </div>
  </li>
</template>

<style scoped lang="scss">
.ww-city {
  @include flexColumn(flex-start, flex-start, 0.375);

  width: 100%;

  padding: 0.625rem 0.75rem;

  border-radius: 0.875rem;

  background: radial-gradient(circle at top left, $color-neutral-border-150, $color-neutral-100);

  &__header {
    @include flexRow(center, space-between, 0.5);
    
    width: 100%;
  }

  &__title-block {
    @include flexColumn(flex-start, flex-start, 0.125);
  }

  &__name {
    @include textBase(1rem, 600);
  }

  &__time {
    @include textBase(0.75rem, 400, 1.4, $color-neutral-text-100);
  }

  &__condition {
    text-transform: capitalize;
  }

  &__temp-block {
    @include flexRow(center, flex-start, 0.375);
  }

  &__icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  &__temp-main {
    @include flexColumn(flex-end, flex-start);
  }

  &__temp {
    @include textBase(1.5rem, 600);
  }

  &__feels {
    @include textBase(0.75rem, 400, 1.4, $color-neutral-text-100);
  }

  &__extra {
    @include flexRow(flex-start, flex-start, 0.5, wrap);
    @include textBase(0.75rem, 400, 1.4, $color-neutral-text-100);
  }
}
</style>
