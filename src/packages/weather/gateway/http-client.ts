import type { ZodType } from 'zod';
import { WeatherError } from '../types/errors';

const REQUEST_TIMEOUT_MS = 10000;

/** Low-level fetch + Zod validation. Translates transport faults into typed errors. */
export async function getJson<T>(url: string, schema: ZodType<T>): Promise<T> {
	const response = await requestOrThrow(url);
	const payload = await response.json();
	return parseOrThrow(schema, payload);
}

async function requestOrThrow(url: string): Promise<Response> {
	const response = await fetchWithTimeout(url).catch(() => {
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

/** fetch() nunca expira sozinho — uma conexão travada (DNS, firewall, host fora do ar)
 * prende a Promise para sempre. AbortController garante que sempre caímos no fallback. */
function fetchWithTimeout(url: string): Promise<Response> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

function parseOrThrow<T>(schema: ZodType<T>, payload: unknown): T {
	const result = schema.safeParse(payload);

	if (!result.success) {
		throw new WeatherError('invalid-response');
	}

	return result.data;
}
