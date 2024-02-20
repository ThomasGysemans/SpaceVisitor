<script lang="ts">
  import { BufferAttribute, BufferGeometry, type Object3D, LineLoop } from 'three';
  import { T, useThrelte } from '@threlte/core'
  import { INITIAL_FOV, SOLAR_SYSTEM_RADIUS } from '$lib/constants';
  import { planetsStore } from '$lib/stores/planets';
  import { Billboard, Stars } from '@threlte/extras';
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Spaceship from './Spaceship.svelte';
  import Earth from './planets/Earth.svelte';
  import Mercury from './planets/Mercury.svelte';
  import Venus from './planets/Venus.svelte';
  import Mars from './planets/Mars.svelte';
  import Jupiter from './planets/Jupiter.svelte';
  import Saturn from './planets/Saturn.svelte';
  import Uranus from './planets/Uranus.svelte';
  import Neptune from './planets/Neptune.svelte';
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