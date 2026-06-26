import { ZodError } from 'zod';
import { historyModule } from '../../history/module/history.module.svelte';
import { notificationsModule } from '../../notifications/module/notifications.module';
import { weatherService } from '../service/weather.service';
import { weatherMessages } from '../toast/messages';
import type { City, WeatherSnapshot } from '../types/domain';
import { WeatherError, type WeatherErrorCode } from '../types/errors';

type Status = 'idle' | 'searching' | 'loading' | 'ready' | 'error';

const ERROR_TEXT: Record<WeatherErrorCode, string> = {
	'city-not-found': weatherMessages.cityNotFound,
	'request-failed': weatherMessages.requestFailed,
	'invalid-response': weatherMessages.invalidResponse
};

/** Single interface between the UI and the weather domain. */
class WeatherModule {
	private statusValue = $state<Status>('idle');
	private resultsValue = $state<City[]>([]);
	private snapshotValue = $state<WeatherSnapshot | null>(null);

	get status(): Status {
		return this.statusValue;
	}

	get results(): City[] {
		return this.resultsValue;
	}

	get snapshot(): WeatherSnapshot | null {
		return this.snapshotValue;
	}

	get isBusy(): boolean {
		return this.statusValue === 'searching' || this.statusValue === 'loading';
	}

	async search(rawQuery: string): Promise<void> {
		this.statusValue = 'searching';
		this.resultsValue = [];

		try {
			await this.runSearch(rawQuery);
		} catch (error) {
			this.fail(error);
		}
	}

	async select(city: City): Promise<void> {
		this.statusValue = 'loading';
		this.resultsValue = [];

		try {
			this.snapshotValue = await weatherService.loadSnapshot(city);
			this.statusValue = 'ready';
			historyModule.record(city);
			notificationsModule.notifySuccess(weatherMessages.loaded(city.name));
		} catch (error) {
			this.fail(error);
		}
	}

	private async runSearch(rawQuery: string): Promise<void> {
		const cities = await weatherService.searchCities(rawQuery);

		if (cities.length === 0) {
			throw new WeatherError('city-not-found');
		}

		if (cities.length === 1) {
			await this.select(cities[0]);
			return;
		}

		this.resultsValue = cities;
		this.statusValue = 'idle';
	}

	private fail(error: unknown): void {
		this.statusValue = 'error';
		notificationsModule.notifyError(this.messageFor(error));
	}

	private messageFor(error: unknown): string {
		if (error instanceof WeatherError) {
			return ERROR_TEXT[error.code];
		}

		if (error instanceof ZodError) {
			return error.issues[0]?.message ?? weatherMessages.requestFailed;
		}

		return weatherMessages.requestFailed;
	}
}

export const weatherModule = new WeatherModule();
