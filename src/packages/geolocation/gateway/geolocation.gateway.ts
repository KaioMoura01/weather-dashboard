export interface Coordinates {
	lat: number;
	lon: number;
}

/** Boundary for the browser Geolocation API. */
export const geolocationGateway = {
	current(): Promise<Coordinates> {
		if (typeof navigator === 'undefined' || !navigator.geolocation) {
			return Promise.reject(new Error('geolocation-unavailable'));
		}

		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
				() => reject(new Error('geolocation-denied')),
				{ timeout: 8000 }
			);
		});
	}
};
