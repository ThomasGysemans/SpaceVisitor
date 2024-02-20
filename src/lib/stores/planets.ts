import { writable } from "svelte/store";

export const planetsStore = writable<Map<string, PlanetData>>(new Map());