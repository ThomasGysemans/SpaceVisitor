<script lang="ts">
  import { T, useLoader, useTask } from '@threlte/core';
  import { AdditiveBlending, IcosahedronGeometry, Mesh, MeshPhongMaterial, Texture, TextureLoader } from 'three';
  import fresnel from '$lib/fresnel';

  interface PlanetTextures {
    map: string;
    normalMap: string;
    lights?: string;
    clouds?: string;
  }

  export let x: number;
  export let y: number;
  export let z: number;
  export let tilt: number;
  export let radius: number;
  export let rotationSpeed: number;
  export let cloudsRotationSpeed: number;
  export let atmosphere: boolean = false;
  export let atmosphereColor: number | undefined = undefined;
  export let texturesPaths: PlanetTextures;

  const textures = useLoader(TextureLoader).load({
    ...texturesPaths
  });

  const geometry = new IcosahedronGeometry(radius, 12);

  let planet: Mesh;
  let clouds: Mesh;

  function createPhongMaterial(map: Texture, normalMap: Texture): MeshPhongMaterial {
    const phongMat = new MeshPhongMaterial();
    phongMat.map = map;
    phongMat.normalMap = normalMap;
    phongMat.normalScale.set(10, 10);
    return phongMat;
  }

  useTask((delta) => {
    if (planet != undefined) planet.rotation.y += rotationSpeed * delta;
    if (clouds != undefined) clouds.rotation.y += cloudsRotationSpeed * delta;
  });
</script>

<T.Group
  position={[x, y, z]}
>
  {#await textures then texture}
    {@const phongMat = createPhongMaterial(texture.map, texture.normalMap)}
    <T.Mesh
      bind:ref={planet}
      rotation.z={tilt}
    >
      <T is={geometry} />
      <T is={phongMat} />
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
