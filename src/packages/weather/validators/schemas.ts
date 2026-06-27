import { z } from 'zod';

/** Zod schemas that parse and narrow raw API responses. */

export const citySearchSchema = z
	.string()
	.trim()
	.min(2, 'Digite ao menos 2 caracteres.')
	.max(60, 'Nome de cidade muito longo.');

export const geoResponseSchema = z.array(
	z.object({
		name: z.string().optional(),
		display_name: z.string(),
		lat: z.string(),
		lon: z.string(),
		address: z
			.object({
				country: z.string().optional(),
				state: z.string().optional(),
				city: z.string().optional(),
				town: z.string().optional(),
				village: z.string().optional(),
				municipality: z.string().optional(),
				county: z.string().optional()
			})
			.optional()
	})
);

export const forecastResponseSchema = z.object({
	current: z.object({
		temperature_2m: z.number(),
		apparent_temperature: z.number(),
		relative_humidity_2m: z.number(),
		wind_speed_10m: z.number(),
		surface_pressure: z.number(),
		weather_code: z.number(),
		is_day: z.number()
	}),
	hourly: z.object({
		time: z.array(z.string()),
		precipitation_probability: z.array(z.number().nullable())
	}),
	daily: z.object({
		time: z.array(z.string()),
		weather_code: z.array(z.number()),
		temperature_2m_max: z.array(z.number()),
		temperature_2m_min: z.array(z.number()),
		sunrise: z.array(z.string()),
		sunset: z.array(z.string()),
		wind_speed_10m_max: z.array(z.number()),
		precipitation_probability_max: z.array(z.number().nullable())
	})
});

export const briefResponseSchema = z.object({
	current: z.object({
		temperature_2m: z.number(),
		weather_code: z.number(),
		is_day: z.number()
	})
});

export const reverseGeoSchema = z.object({
	name: z.string().optional(),
	display_name: z.string().optional(),
	lat: z.string(),
	lon: z.string(),
	address: z
		.object({
			country: z.string().optional(),
			state: z.string().optional(),
			city: z.string().optional(),
			town: z.string().optional(),
			village: z.string().optional(),
			municipality: z.string().optional(),
			county: z.string().optional()
		})
		.optional()
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
