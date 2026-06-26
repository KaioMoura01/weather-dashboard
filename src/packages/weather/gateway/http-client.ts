import type { ZodType } from 'zod';
import { WeatherError } from '../types/errors';

/** Low-level fetch + Zod validation. Translates transport faults into typed errors. */
export async function getJson<T>(url: string, schema: ZodType<T>): Promise<T> {
	const response = await requestOrThrow(url);
	const payload = await response.json();
	return parseOrThrow(schema, payload);
}

async function requestOrThrow(url: string): Promise<Response> {
	const response = await fetch(url).catch(() => {
		throw new WeatherError('request-failed');
	});

	if (response.status === 404) {
		throw new WeatherError('city-not-found');
	}

	if (!response.ok) {
		throw new WeatherError('request-failed');
	}

	return response;
}

function parseOrThrow<T>(schema: ZodType<T>, payload: unknown): T {
	const result = schema.safeParse(payload);

	if (!result.success) {
		throw new WeatherError('invalid-response');
	}

	return result.data;
}
