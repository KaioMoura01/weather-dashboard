import { hourlyWindow } from '../service/hourly-window';
import { moonReading } from '../service/moon-phase';
import { sunArc } from '../service/sun-arc';
import { uvReading } from '../service/uv-level';
import type { HourlyForecast } from '../types/domain';
import type { MoonReading, SunArc, UvReading } from '../types/insights';
import { weatherModule } from './weather.module.svelte';

/** Leituras derivadas (hora a hora, UV, sol, lua) para o dia selecionado. */
class InsightsModule {
	get hourly(): HourlyForecast[] {
		const snapshot = weatherModule.snapshot;
		const day = weatherModule.selectedDay;

		if (!snapshot || !day) {
			return [];
		}

		return hourlyWindow(snapshot.hourlyForecast, day.isoDate, weatherModule.isToday, snapshot.current.localTime);
	}

	get uv(): UvReading | null {
		const day = weatherModule.selectedDay;
		const current = weatherModule.snapshot?.current;

		if (!day || !current) {
			return null;
		}

		return uvReading(weatherModule.isToday ? current.uvIndex : day.uvMax);
	}

	get sun(): SunArc | null {
		const day = weatherModule.selectedDay;
		const current = weatherModule.snapshot?.current;

		if (!day || !current) {
			return null;
		}

		return sunArc(day.sunrise, day.sunset, current.localTime, weatherModule.isToday);
	}

	get moon(): MoonReading | null {
		const day = weatherModule.selectedDay;
		return day ? moonReading(day.isoDate) : null;
	}
}

export const insightsModule = new InsightsModule();
