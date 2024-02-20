import type { Vector3 } from "three";

/**
 * Gets a string representation of an instance of `Vector3`.
 * @param vec3 An instance of `Vector3`.
 * @returns A string representing coordinates in a 3D space.
 */
export default function(vec3: Vector3) {
  return "(" + Math.floor(vec3.x) + ";" + Math.floor(vec3.y) + ";" + Math.floor(vec3.z) + ")";
}