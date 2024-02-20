import { type Camera, Raycaster, Scene, Vector2 } from "three";

/**
 * Gets the first object a ray cast intersects with from the center of the player's camera.
 * @param camera The player's default camera.
 * @param scene The scene in which the game is played.
 * @returns The first object the ray cast intersected with.
 */
export default function(camera: Camera, scene: Scene) {
  const raycaster = new Raycaster();
  raycaster.setFromCamera(new Vector2(0, 0), camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    return intersects[0].object;
  }
  return null;
}