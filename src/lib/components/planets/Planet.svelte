<script lang="ts">
  import { T, useLoader, useTask } from '@threlte/core';
  import { AdditiveBlending, DoubleSide, Group, IcosahedronGeometry, Mesh, MeshPhongMaterial, MeshStandardMaterial, RingGeometry, Texture, TextureLoader } from 'three';
  import { SECONDS_PER_YEAR, SIMULATION_SPEED_SCALE } from '$lib/constants';
  import createLineThroughPoles from '$lib/createLineThroughPoles';
  import createOrbitPath from '$lib/createOrbitPath';
  import fresnel from '$lib/fresnel';

  interface PlanetTextures {
    map: string;
    normalMap?: string;
    specularMap?: string;
    lights?: string;
    clouds?: string;
    ring?: string;
  }

  export let tiltRadians: number;
  export let radius: number;
  export let rotationSpeed: number;
  export let cloudsRotationSpeed: number | undefined = undefined;
  export let atmosphere: boolean = false;
  export let atmosphereColor: number | undefined = undefined;
  export let atmosphereScale: number | undefined = undefined;
  export let texturesPaths: PlanetTextures;
  export let includeLineThroughPoles: boolean = false;
  export let orbitData: OrbitData | undefined = undefined;
  export let ringScale: number | undefined = undefined;

  const textures = useLoader(TextureLoader).load({
    ...texturesPaths
  });

  const geometry = new IcosahedronGeometry(radius, 12);
  const orbit = orbitData != undefined ? createOrbitPath({...orbitData}) : undefined;
  const orbitSpeed = orbitData != undefined ? calculateOrbitSpeed() : 0;

  let system: Group;
  let planetMesh: Mesh;
  let cloudsMesh: Mesh;
  let orbitPosition = Math.random(); // a number between 0 and 1 from which we get the exact coordinates from the orbit's curve

  function createPlanetMat(map: Texture, normalMap?: Texture, specularMap?: Texture) {
    if (normalMap) {
      const phongMat = new MeshPhongMaterial();
      phongMat.map = map;
      phongMat.normalMap = normalMap;
      phongMat.normalScale.set(10, 10);
      if (specularMap) {
        phongMat.specularMap = specularMap;
        phongMat.shininess = 100;
      }
      return phongMat;
    } else {
      return new MeshStandardMaterial({ map });
    }
  }

  function createRingMesh(texture: Texture) {
    const mat = new MeshStandardMaterial({ map: texture, transparent: true, side: DoubleSide });
    const geo = new RingGeometry(10, 30, 64);
    const mesh = new Mesh(geo, mat);
    mesh.rotation.z = tiltRadians;
    mesh.rotateX(-Math.PI/2);
    mesh.scale.set(ringScale ?? 1, ringScale ?? 1, ringScale ?? 1);

    return mesh;
  }

  function calculateOrbitSpeed() {
    return (1 / (orbitData!.yearsPerRevolution * SECONDS_PER_YEAR)) * SIMULATION_SPEED_SCALE;
  }

  useTask((delta) => {
    // Handle rotation of the planet on its own axis.
    // The clouds have a different rotation so that it looks more dynamic.
    if (planetMesh != undefined) planetMesh.rotation.y += rotationSpeed * delta;
    if (cloudsMesh != undefined && cloudsRotationSpeed != undefined) cloudsMesh.rotation.y += cloudsRotationSpeed * delta;

    if (orbit != undefined && orbitData != undefined) {
      orbitPosition = (orbitPosition + orbitSpeed) % 1;
      const p = orbit.curve.getPoint(orbitPosition);
      system.position.x = p.x;
      system.position.z = p.y;
    }
  });
</script>

<T.Group>
  <T.Group bind:ref={system} >
    {#await textures then texture}
      {@const planetMat = createPlanetMat(texture.map, texture.normalMap, texture.specularMap)}
      <T.Mesh
        bind:ref={planetMesh}
        rotation.z={tiltRadians}
        castShadow
      >
        <T is={geometry} />
        <T is={planetMat} />
        {#if texturesPaths.lights != undefined}
          <T.Mesh>
            <T is={geometry} />
            <T.MeshStandardMaterial map={texture.lights} blending={AdditiveBlending} />
          </T.Mesh>
        {/if}
        {#if texturesPaths.clouds != undefined}
          <T.Mesh bind:ref={cloudsMesh} on:create={({ref}) => ref.scale.setScalar(1.01) }>
            <T is={geometry} />
            <T.MeshStandardMaterial map={texture.clouds} blending={AdditiveBlending} transparent opacity={0.5} />
          </T.Mesh>
        {/if}
      </T.Mesh>
      {#if atmosphere}
        <T.Mesh on:create={({ref}) => ref.scale.setScalar(1.025)}>
          <T is={geometry} />
          <T is={fresnel({ rimHex: atmosphereColor, scale: atmosphereScale })} />
        </T.Mesh>
      {/if}
      {#if texture.ring != undefined}
        <T is={createRingMesh(texture.ring)} />
      {/if}
    {/await}
    {#if includeLineThroughPoles}
      <T is={createLineThroughPoles(radius, tiltRadians)} />
    {/if}
    <slot />
  </T.Group>
  {#if orbit != undefined}
    <T is={orbit.orbitLine} />
  {/if}
</T.Group>