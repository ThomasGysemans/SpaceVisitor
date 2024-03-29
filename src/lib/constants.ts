import { Vector3 } from "three";

export const INITIAL_FOV = 60;
export const INITIAL_SPACESHIP_SPEED = 0.3;
export const INITIAL_SPACESHIP_POS = new Vector3(0, 400, 0);
export const SOLAR_SYSTEM_RADIUS = 6000;
export const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60;
export const SIMULATION_SPEED_SCALE = 10000; // the game simulates the speed of the solar system multiplied by this factor
export const AU = 200; // 1 AU is around 150 000 000 kilometers, here 200 units is 1 AU.
export const THIRD_PERSON_CAMERA_POSITION = new Vector3(0, 0.25, 1);
export const SPACESHIP_SCALE = 0.25; // the scale of the spaceship model
export const BARYCENTER_OFFSET = 5; // offset of the centerX of the ellipses due to the Sun not being at the right scale
export const SUN_RADIUS = 50;
export const EARTH_RADIUS = 6; // the planets cannot be at the right scale because in reality the ratio Sun/Earth is extremely small.
export const PITCH_STRENGTH = 0.0025;
export const JAW_STRENGTH = 0.0025;