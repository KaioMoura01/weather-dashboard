/** Presentation-only formatters shared by composes. No domain logic. */
const weekdayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
const timeFormatter = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });

export function formatWeekday(isoDate: string): string {
	return weekdayFormatter.format(new Date(`${isoDate}T12:00:00`));
}

export function formatTime(isoTime: string): string {
	return timeFormatter.format(new Date(isoTime));
}

export function formatTemperature(value: number): string {
	return `${value}°`;
}
