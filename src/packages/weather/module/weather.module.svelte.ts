import { ZodError } from 'zod';
import { geolocationGateway } from '../../geolocation/gateway/geolocation.gateway';
import { historyModule } from '../../history/module/history.module.svelte';
import { notificationsModule } from '../../notifications/module/notifications.module';
import { FALLBACK_CITY } from '../constants/cities';
import { weatherService } from '../service/weather.service';
import { weatherMessages } from '../toast/messages';
import type { City, ForecastDay, WeatherSnapshot } from '../types/domain';
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
	private selectedIndexValue = $state(0);
	private locatingValue = $state(false);

	get status(): Status {
		return this.statusValue;
	}

	get results(): City[] {
		return this.resultsValue;
	}

	get snapshot(): WeatherSnapshot | null {
		return this.snapshotValue;
	}

	get selectedIndex(): number {
		return this.selectedIndexValue;
	}

	get selectedDay(): ForecastDay | null {
		return this.snapshotValue?.forecast[this.selectedIndexValue] ?? null;
	}

	get isToday(): boolean {
		return this.selectedIndexValue === 0;
	}

	get isBusy(): boolean {
		return this.statusValue === 'searching' || this.statusValue === 'loading' || this.locatingValue;
	}

	selectDay(index: number): void {
		this.selectedIndexValue = index;
	}

	/** Bootstrap: tenta geolocalização do usuário; cai na cidade padrão se negada. */
	async locate(): Promise<void> {
		if (this.snapshotValue) {
			return;
		}

		this.locatingValue = true;

		try {
			const coords = await geolocationGateway.current();
			const city = await weatherService.reverseGeocode(coords.lat, coords.lon);
			await this.select(city);
		} catch {
			await this.select(FALLBACK_CITY);
		} finally {
			this.locatingValue = false;
		}
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
			this.selectedIndexValue = 0;
			this.statusValue = 'ready';
			historyModule.record(city);
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
