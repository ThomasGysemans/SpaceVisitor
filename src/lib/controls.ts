import { Vector3, type PerspectiveCamera } from "three";
import { browser } from "$app/environment";
import { INITIAL_FOV, INITIAL_SPACESHIP_POS, INITIAL_SPACESHIP_SPEED } from "./constants";

type Controls = { [key: string]: boolean }

export let controls: Controls = {};

let maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
let turbo = 0;
let stopping = false;
let spaceshipSpeed = INITIAL_SPACESHIP_SPEED;

if (browser) {
  window.addEventListener("keydown", e => {
    controls[e.key.toLowerCase()] = true;
  });
  
  window.addEventListener("keyup", e => {
    const key = e.key.toLowerCase();
    controls[key] = false;

    if (key === "x") {
      if (stopping) {
        console.log("accelerating");
      } else {
        console.log("stopping");
      }
      stopping = !stopping;
    }
  });
}

function easeOutQuad(x: number) {
  return 1 - (1 - x) * (1 - x);
}

export function updateSpaceshipAxis(x: Vector3, y: Vector3, z: Vector3, spaceshipPosition: Vector3, camera: PerspectiveCamera) {
  jawVelocity *= 0.95;
  pitchVelocity *= 0.95;

  // Basically it forces the value to remain in the interval [-maxVelocity, maxVelocity]
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

  if (stopping) {
    spaceshipSpeed *= 0.97; // at every frame the ship will slow down by 3%
  } else {
    spaceshipSpeed = INITIAL_SPACESHIP_SPEED;
  }

  // to reset the spaceship
  if (controls["r"]) {
    jawVelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    stopping = false;
    spaceshipPosition.set(INITIAL_SPACESHIP_POS.x, INITIAL_SPACESHIP_POS.y, INITIAL_SPACESHIP_POS.z);
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity); 

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  if (controls.shift && !stopping) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);
  
  let turboSpeed = easeOutQuad(turbo) * 0.03;
  camera.fov = INITIAL_FOV + turboSpeed * 900;
  camera.updateProjectionMatrix();

  spaceshipPosition.add(z.clone().multiplyScalar(-spaceshipSpeed - turboSpeed));
}