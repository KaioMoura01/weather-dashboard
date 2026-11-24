import { tick } from 'svelte';
import { themeGateway } from '../gateway/theme.gateway';
import { themeService } from '../service/theme.service';
import type { Theme, ThemeOrigin } from '../types/theme';

/** Reactive facade for the light/dark theme. */
class ThemeModule {
	private active = $state<Theme>('light');

	get current(): Theme {
		return this.active;
	}

	get isDark(): boolean {
		return this.active === 'dark';
	}

	hydrate(): void {
		this.set(themeService.resolveInitial());
	}

	async toggle(origin: ThemeOrigin): Promise<void> {
		const next = themeService.toggle(this.active);

		await themeGateway.animate(async () => {
			this.set(next);
			await tick();
		}, origin);
	}

	private set(theme: Theme): void {
		this.active = theme;
		themeGateway.apply(theme);
		themeGateway.persist(theme);
	}
}

export const themeModule = new ThemeModule();
