<script lang="ts">
  import { BufferAttribute, BufferGeometry, type Object3D, LineLoop, Vector3 } from 'three';
  import { controls, getJumpTarget, isJumping, shouldStopJump, startFTLJump, stopJump } from '$lib/controls';
  import { INITIAL_FOV, SOLAR_SYSTEM_RADIUS, SUN_RADIUS } from '$lib/constants';
  import { T, useTask, useThrelte } from '@threlte/core'
  import { playerPosition } from '$lib/stores/player';
  import { Billboard, Stars } from '@threlte/extras';
  import { planetsStore } from '$lib/stores/planets';
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Mercury from './planets/Mercury.svelte';
  import Jupiter from './planets/Jupiter.svelte';
  import Neptune from './planets/Neptune.svelte';
  import Saturn from './planets/Saturn.svelte';
  import Uranus from './planets/Uranus.svelte';
  import Spaceship from './Spaceship.svelte';
  import Earth from './planets/Earth.svelte';
  import Venus from './planets/Venus.svelte';
  import Mars from './planets/Mars.svelte';
  import intersect from '$lib/intersect';
  import Sun from './Sun.svelte';

  const { camera, scene } = useThrelte();

  let raycastInterval: number;
  let billboard: LineLoop;
  let billboardPos: [number, number, number] = [0, 0, 0];

  function isInteractiveObject(object: Object3D) {
    return object.userData != undefined && "uniqueId" in object.userData && object.userData["uniqueId"] != undefined;
  }

  const billboardGeometry = new BufferGeometry();
  const vertices = new Float32Array([
    -1,  1,  0,
    1,  1,  0,
    1, -1,  0,
    -1, -1,  0,
    -1,  1,  0 // To close the loop
  ]);
  
  billboardGeometry.setAttribute('position', new BufferAttribute(vertices, 3));

  function getBillboardVec3(): Vector3 {
    return new Vector3(billboardPos[0], billboardPos[1], billboardPos[2]);
  }

  onMount(() => {
    raycastInterval = setInterval(() => {
      if (billboard != undefined) {
        const intersectedObject = intersect($camera, scene);
        if (intersectedObject && isInteractiveObject(intersectedObject)) {
          const planetId = intersectedObject.userData["uniqueId"];
          if ($planetsStore.has(planetId)) {
            const planetData = $planetsStore.get(planetId)!;
            const planetPos = planetData.position;
            const radius = planetData.radius + 5;
            billboardPos = [planetPos.x, planetPos.y, planetPos.z];
            billboard.scale.set(radius, radius, radius);
            billboard.visible = true;
          } else if (planetId === "Sun") {
            const radius = SUN_RADIUS + 5;
            billboardPos = [0, 0, 0];
            billboard.scale.set(radius, radius, radius);
            billboard.visible = true;
          }
        } else {
          billboard.visible = false;
        }
      }
    }, 1000 / 20);
  });

  onDestroy(() => {
    if (browser) {
      clearInterval(raycastInterval);
    }
  });

  useTask(() => {
    if (!isJumping()) {
      if (billboard?.visible && controls["j"]) {
        let billboardPos = getBillboardVec3();
        if ($playerPosition.distanceTo(billboardPos) > 300) {
          startFTLJump(billboardPos);
        }
      }
    } else {
      if (shouldStopJump($playerPosition)) {
        stopJump();
      }
    }
  });
</script>

<T.PerspectiveCamera
  makeDefault
  fov={INITIAL_FOV}
  far={SOLAR_SYSTEM_RADIUS * 3}
/>

<Stars radius={SOLAR_SYSTEM_RADIUS} fade={false} depth={100} factor={50} />

<Spaceship />

<Sun />
<Mercury />
<Venus />
<Earth />
<Mars />
<Jupiter />
<Saturn />
<Uranus />
<Neptune />

<Billboard position={billboardPos}>
  <T.LineLoop bind:ref={billboard}>
    <T is={billboardGeometry} />
    <T.LineBasicMaterial color={0xff0000} />
  </T.LineLoop>
</Billboard>