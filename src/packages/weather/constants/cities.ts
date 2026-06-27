import type { City } from '../types/domain';

/** Cidades fixas exibidas no painel "Outras grandes cidades". */
export const PRESET_CITIES: City[] = [
	{ name: 'São Paulo', country: 'Brasil', lat: -23.5505, lon: -46.6333 },
	{ name: 'Lisboa', country: 'Portugal', lat: 38.7223, lon: -9.1393 },
	{ name: 'Nova York', country: 'Estados Unidos', lat: 40.7128, lon: -74.006 },
	{ name: 'Tóquio', country: 'Japão', lat: 35.6762, lon: 139.6503 }
];

/** Cidade padrão quando a geolocalização é negada ou indisponível. */
export const FALLBACK_CITY: City = {
	name: 'São Paulo',
	country: 'Brasil',
	lat: -23.5505,
	lon: -46.6333
};
