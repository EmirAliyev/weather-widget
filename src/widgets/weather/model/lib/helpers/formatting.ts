import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { IWeatherData } from '@/shared/model/types';

dayjs.extend(utc);

function formatCityTime(timestamp: number, timezoneOffset: number, format: string = 'HH:mm'): string {
  if (!timestamp) return '';

  const offsetSec = timezoneOffset ?? 0;

  return dayjs
    .utc(timestamp * 1000)
    .utcOffset(offsetSec / 60)
    .format(format);
}

export function formatTemp(value: number | undefined | null): string {
  if (typeof value !== 'number') return '—';
  return `${Math.round(value)}°C`;
}

export function getIconUrl(weatherData: IWeatherData | null | undefined): string {
  const icon = weatherData?.weather?.[0]?.icon;
  if (!icon) return '';
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function formatTime(weatherData: IWeatherData | null | undefined): string {
  if (!weatherData || !weatherData.dt) return '';
  return formatCityTime(weatherData.dt, weatherData.timezone);
}
