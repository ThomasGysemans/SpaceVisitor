import { INITIAL_SPACESHIP_POS } from "$lib/constants";
import { writable } from "svelte/store";
import { Vector3 } from "three";

export const playerPosition = writable<Vector3>(INITIAL_SPACESHIP_POS.clone());