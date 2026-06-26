import { z } from 'zod';

const citySchema = z.object({
	name: z.string(),
	country: z.string(),
	state: z.string().optional(),
	lat: z.number(),
	lon: z.number()
});

export const searchEntriesSchema = z.array(
	z.object({
		city: citySchema,
		searchedAt: z.number()
	})
);
