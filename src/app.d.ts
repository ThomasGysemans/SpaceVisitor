// See https://kit.svelte.dev/docs/types#app

import type { Vector3 } from "three";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface EllipseData {
		semiMajorAxis?: number; // in AU
		eccentricity?: number; 
		lineColor?: number;
		radiusX?: number;
		radiusY?: number;
	}

	interface OrbitData extends EllipseData {
    yearsPerRevolution: number; // number of Earth years for a complete revolution around the sun
  }

	interface PlanetData {
		position: Vector3;
		radius: number;
	}
}

export {};
