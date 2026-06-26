import { DARK_CLASS, THEME_STORAGE_KEY } from '../constants/config';
import type { Theme } from '../types/theme';

/** Boundary for theme persistence and the DOM side effect. */
export const themeGateway = {
	readStored(): Theme | null {
		if (typeof localStorage === 'undefined') {
			return null;
		}

		const value = localStorage.getItem(THEME_STORAGE_KEY);
		return value === 'light' || value === 'dark' ? value : null;
	},

	prefersDark(): boolean {
		if (typeof window === 'undefined') {
			return false;
		}

		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	},

	persist(theme: Theme): void {
		if (typeof localStorage === 'undefined') {
			return;
		}

		localStorage.setItem(THEME_STORAGE_KEY, theme);
	},

	apply(theme: Theme): void {
		if (typeof document === 'undefined') {
			return;
		}

		document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark');
	}
};
