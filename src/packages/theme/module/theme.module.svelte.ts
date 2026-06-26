import { themeGateway } from '../gateway/theme.gateway';
import { themeService } from '../service/theme.service';
import type { Theme } from '../types/theme';

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

	toggle(): void {
		this.set(themeService.toggle(this.active));
	}

	private set(theme: Theme): void {
		this.active = theme;
		themeGateway.apply(theme);
		themeGateway.persist(theme);
	}
}

export const themeModule = new ThemeModule();
