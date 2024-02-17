<script lang="ts">
  import { T, useLoader, useTask } from '@threlte/core';
  import { AdditiveBlending, IcosahedronGeometry, Mesh, MeshPhongMaterial, MeshStandardMaterial, Texture, TextureLoader } from 'three';
  import fresnel from '$lib/fresnel';

  interface PlanetTextures {
    map: string;
    normalMap?: string;
    lights?: string;
    clouds?: string;
  }

  export let x: number;
  export let y: number;
  export let z: number;
  export let tiltDegrees: number;
  export let radius: number;
  export let rotationSpeed: number;
  export let cloudsRotationSpeed: number | undefined = undefined;
  export let atmosphere: boolean = false;
  export let atmosphereColor: number | undefined = undefined;
  export let texturesPaths: PlanetTextures;

  const textures = useLoader(TextureLoader).load({
    ...texturesPaths
  });

  const geometry = new IcosahedronGeometry(radius, 12);

  let planet: Mesh;
  let clouds: Mesh;

  function createPlanetMat(map: Texture, normalMap?: Texture) {
    if (normalMap) {
      const phongMat = new MeshPhongMaterial();
      phongMat.map = map;
      phongMat.normalMap = normalMap;
      phongMat.normalScale.set(10, 10);
      return phongMat;
    } else {
      return new MeshStandardMaterial({ map });
    }
  }

  useTask((delta) => {
    if (planet != undefined) planet.rotation.y += rotationSpeed * delta;
    if (clouds != undefined && cloudsRotationSpeed != undefined) clouds.rotation.y += cloudsRotationSpeed * delta;
  });
</script>

<T.Group
  position={[x, y, z]}
>
  {#await textures then texture}
    {@const planetMat = createPlanetMat(texture.map, texture.normalMap)}
    <T.Mesh
      bind:ref={planet}
      rotation.z={tiltDegrees * Math.PI / 180}
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
        <T.Mesh bind:ref={clouds} on:create={({ref}) => ref.scale.setScalar(1.01) }>
          <T is={geometry} />
          <T.MeshStandardMaterial map={texture.clouds} blending={AdditiveBlending} transparent opacity={0.5} />
        </T.Mesh>
      {/if}
    </T.Mesh>
    {#if atmosphere}
      <T.Mesh on:create={({ref}) => ref.scale.setScalar(1.025)}>
        <T is={geometry} />
        <T is={fresnel({ rimHex: atmosphereColor })} />
      </T.Mesh>
    {/if}
  {/await} 
</T.Group>
