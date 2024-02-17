import { Vector3, type PerspectiveCamera } from "three";
import { browser } from "$app/environment";
import { INITIAL_FOV, INITIAL_SPACESHIP_POS, SPACESHIP_SPEED } from "./constants";

type Controls = { [key: string]: boolean }

export let controls: Controls = {};

if (browser) {
  window.addEventListener("keydown", e => {
    controls[e.key.toLowerCase()] = true;
  });
  
  window.addEventListener("keyup", e => {
    controls[e.key.toLowerCase()] = false;
  });
}

function easeOutQuad(x: number) {
  return 1 - (1 - x) * (1 - x);
}

let maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
let turbo = 0;

export function updateSpaceshipAxis(x: Vector3, y: Vector3, z: Vector3, spaceshipPosition: Vector3, camera: PerspectiveCamera) {
  jawVelocity *= 0.95;
  pitchVelocity *= 0.95;

  if (Math.abs(jawVelocity) > maxVelocity) {
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;
  }

  if (Math.abs(pitchVelocity) > maxVelocity) {
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;
  }

  if (controls["q"]) {
    jawVelocity += 0.0025;
  }

  if (controls["d"]) {
    jawVelocity -= 0.0025;
  }

  if (controls["s"]) {
    pitchVelocity += 0.0025;
  }

  if (controls["z"]) {
    pitchVelocity -= 0.0025;
  }

  // to reset the spaceship
  if (controls["r"]) {
    jawVelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    spaceshipPosition.set(INITIAL_SPACESHIP_POS.x, INITIAL_SPACESHIP_POS.y, INITIAL_SPACESHIP_POS.z);
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity); 

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  if (controls.shift) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);
  
  let turboSpeed = easeOutQuad(turbo) * 0.03;
  camera.fov = INITIAL_FOV + turboSpeed * 900;
  camera.updateProjectionMatrix();

  spaceshipPosition.add(z.clone().multiplyScalar(-SPACESHIP_SPEED - turboSpeed));
}