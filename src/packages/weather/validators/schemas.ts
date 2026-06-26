import { z } from 'zod';

/** Zod schemas that parse and narrow raw Open-Meteo responses. */

export const citySearchSchema = z
	.string()
	.trim()
	.min(2, 'Digite ao menos 2 caracteres.')
	.max(60, 'Nome de cidade muito longo.');

export const geoResponseSchema = z.object({
	results: z
		.array(
			z.object({
				name: z.string(),
				latitude: z.number(),
				longitude: z.number(),
				country: z.string().optional(),
				country_code: z.string().optional(),
				admin1: z.string().optional()
			})
		)
		.optional()
});

export const forecastResponseSchema = z.object({
	current: z.object({
		temperature_2m: z.number(),
		apparent_temperature: z.number(),
		relative_humidity_2m: z.number(),
		wind_speed_10m: z.number(),
		weather_code: z.number()
	}),
	daily: z.object({
		time: z.array(z.string()),
		weather_code: z.array(z.number()),
		temperature_2m_max: z.array(z.number()),
		temperature_2m_min: z.array(z.number())
	})
});

export const marineSchema = z.object({
	hourly: z
		.object({
			time: z.array(z.string()),
			sea_level_height_msl: z.array(z.number().nullable()),
			wave_height: z.array(z.number().nullable())
		})
		.optional()
});
