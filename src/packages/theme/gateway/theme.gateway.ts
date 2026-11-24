import { DARK_CLASS, THEME_STORAGE_KEY } from '../constants/config';
import type { Theme, ThemeOrigin } from '../types/theme';

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

	/** Executa `update` com revelação circular; sem suporte, faz cross-fade de cores. */
	async animate(update: () => Promise<void>, origin: ThemeOrigin): Promise<void> {
		if (typeof document === 'undefined' || prefersReducedMotion()) {
			await update();
			return;
		}

		if (!document.startViewTransition) {
			await fadeColors(update);
			return;
		}

		const transition = document.startViewTransition(update);
		await transition.ready.then(() => revealFrom(origin)).catch(() => undefined);
	},

	apply(theme: Theme): void {
		if (typeof document === 'undefined') {
			return;
		}

		document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark');
	}
};

const REVEAL_MS = 650;
const FADE_MS = 500;

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function revealFrom(origin: ThemeOrigin): void {
	const radius = Math.hypot(
		Math.max(origin.x, window.innerWidth - origin.x),
		Math.max(origin.y, window.innerHeight - origin.y)
	);

	document.documentElement.animate(
		{
			clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`]
		},
		{ duration: REVEAL_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
	);
}

async function fadeColors(update: () => Promise<void>): Promise<void> {
	const root = document.documentElement;
	root.classList.add('theme-fade');
	await update();
	setTimeout(() => root.classList.remove('theme-fade'), FADE_MS);
}
