/** Typed failure causes so Services can branch without parsing strings. */
export type WeatherErrorCode = 'city-not-found' | 'request-failed' | 'invalid-response';

export class WeatherError extends Error {
	constructor(readonly code: WeatherErrorCode) {
		super(code);
		this.name = 'WeatherError';
	}
}
