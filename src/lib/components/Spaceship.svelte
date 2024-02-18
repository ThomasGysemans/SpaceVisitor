<script lang="ts">
  import { Vector3, type Group, Matrix4, PerspectiveCamera, Quaternion } from "three";
  import { T } from '@threlte/core'
  import { useTask, useThrelte } from "@threlte/core";
  import { updateSpaceshipAxis } from "$lib/controls";
  import { INITIAL_SPACESHIP_POS, SPACESHIP_SCALE, THIRD_PERSON_CAMERA_POSITION } from "$lib/constants";
  import SpaceshipModel from "./models/spaceship.svelte";

  const x = new Vector3(1, 0, 0);
  const y = new Vector3(0, 1, 0);
  const z = new Vector3(0, 0, 1);
  const delayedRotMatrix = new Matrix4();
  const delayedQuaternion = new Quaternion();

  const { camera } = useThrelte();

  let spaceshipPosition = INITIAL_SPACESHIP_POS.clone();
  let spaceship: Group;

  useTask(() => {
    if (spaceship != undefined) {
      updateSpaceshipAxis(x, y, z, spaceshipPosition, camera.current as PerspectiveCamera);

      const rotMatrix = new Matrix4().makeBasis(x, y, z);
      const matrix = new Matrix4()
        .multiply(new Matrix4().makeTranslation(spaceshipPosition.x, spaceshipPosition.y, spaceshipPosition.z))
        .multiply(rotMatrix);
    
      spaceship.matrixAutoUpdate = false;
      spaceship.matrix.copy(matrix);
      spaceship.matrixWorldNeedsUpdate = true;

      const quaternionA = new Quaternion().copy(delayedQuaternion);
      const quaternionB = new Quaternion().setFromRotationMatrix(rotMatrix);

      const interpolationFactor = 0.175;
      const interpolatedQuaternion = new Quaternion().copy(quaternionA);
      interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
      delayedQuaternion.copy(interpolatedQuaternion);

      delayedRotMatrix.identity();
      delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

      const cameraMatrix = new Matrix4()
        .multiply(new Matrix4().makeTranslation(spaceshipPosition.x, spaceshipPosition.y, spaceshipPosition.z)) // move camera to the center of the spaceship
        .multiply(delayedRotMatrix) // follow the rotation of the spaceship with a delay (17.5% delay)
        .multiply(new Matrix4().makeRotationX(-0.2)) // rotate camera so that it looks at the spaceship from above
        .multiply(new Matrix4().makeTranslation(THIRD_PERSON_CAMERA_POSITION)); // move the camera away from the spaceship
      
      camera.current.matrixAutoUpdate = false;
      camera.current.matrix.copy(cameraMatrix);
      camera.current.matrixWorldNeedsUpdate = true;
    }
  });
</script>

<T.Group
  bind:ref={spaceship}
  position.x={spaceshipPosition.x}
  position.y={spaceshipPosition.y}
  position.z={spaceshipPosition.z}
>
  <SpaceshipModel rotation.y={3/2 * Math.PI} scale={[SPACESHIP_SCALE, SPACESHIP_SCALE, SPACESHIP_SCALE]} />
</T.Group>