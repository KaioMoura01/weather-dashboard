import { themeGateway } from '../gateway/theme.gateway';
import type { Theme } from '../types/theme';

/** Rules for resolving and toggling the active theme. */
export const themeService = {
	resolveInitial(): Theme {
		const stored = themeGateway.readStored();
		return stored ?? (themeGateway.prefersDark() ? 'dark' : 'light');
	},

	toggle(current: Theme): Theme {
		return current === 'dark' ? 'light' : 'dark';
	}
};
