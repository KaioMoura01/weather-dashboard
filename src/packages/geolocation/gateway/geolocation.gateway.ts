export interface Coordinates {
	lat: number;
	lon: number;
}

const TIMEOUT_MS = 8000;

/** Boundary for the browser Geolocation API. */
export const geolocationGateway = {
	current(): Promise<Coordinates> {
		if (typeof navigator === 'undefined' || !navigator.geolocation) {
			return Promise.reject(new Error('geolocation-unavailable'));
		}

		return Promise.race([this.request(), this.watchdog()]);
	},

	request(): Promise<Coordinates> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
				() => reject(new Error('geolocation-denied')),
				{ timeout: TIMEOUT_MS }
			);
		});
	},

	/** Alguns navegadores nunca chamam os callbacks do getCurrentPosition (prompt ignorado,
	 * geolocalização bloqueada por política). Esse watchdog garante que sempre caímos no fallback. */
	watchdog(): Promise<never> {
		return new Promise((_, reject) => {
			setTimeout(() => reject(new Error('geolocation-timeout')), TIMEOUT_MS);
		});
	}
};
