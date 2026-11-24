import { unitsGateway } from '../gateway/units.gateway';
import { unitsService } from '../service/units.service';
import type { TemperatureUnit } from '../types/unit';

/** Reactive facade for the °C/°F preference. */
class UnitsModule {
	private active = $state<TemperatureUnit>('C');

	get current(): TemperatureUnit {
		return this.active;
	}

	hydrate(): void {
		this.active = unitsService.resolveInitial(unitsGateway.readStored());
	}

	set(unit: TemperatureUnit): void {
		this.active = unit;
		unitsGateway.persist(unit);
	}

	display(celsius: number): number {
		return unitsService.convert(celsius, this.active);
	}
}

export const unitsModule = new UnitsModule();
