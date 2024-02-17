<script lang="ts">
  import { T, useLoader, useTask } from '@threlte/core';
  import { AdditiveBlending, IcosahedronGeometry, Mesh, MeshPhongMaterial, Texture, TextureLoader } from 'three';
  import fresnel from '$lib/fresnel';

  const earthX = -20;
  const earthY = 58;
  const earthZ = -35;

  const textures = useLoader(TextureLoader).load({
    map: "/textures/new_earth/2k_earth_daymap.jpg",
    lights: "/textures/new_earth/2k_earth_nightmap.jpg",
    clouds: "/textures/new_earth/2k_earth_clouds.jpg",
    normalMap: "textures/new_earth/2k_earth_normal_map.jpg"
  });

  const geometry = new IcosahedronGeometry(2, 12);
  const atmosphereShaderMat = fresnel();

  let earth: Mesh;
  let clouds: Mesh;

  function createPhongMaterial(map: Texture, normalMap: Texture): MeshPhongMaterial {
    const phongMat = new MeshPhongMaterial();
    phongMat.map = map;
    phongMat.normalMap = normalMap;
    phongMat.normalScale.set(20, 20);
    return phongMat;
  }

  useTask((delta) => {
    if (earth != undefined && clouds != undefined) {
      earth.rotation.y += 0.1 * delta;
      clouds.rotation.y -= 0.05 * delta;
    }
  });
</script>

<T.Group
  position={[earthX, earthY, earthZ]}
  scale={[2, 2, 2]}
>
  {#await textures then texture}
    {@const phongMat = createPhongMaterial(texture.map, texture.normalMap)}
    <T.Mesh
      bind:ref={earth}
      rotation.z={-23.4 * Math.PI / 180}
    >
      <T is={geometry} />
      <T is={phongMat} />
      <T.Mesh>
        <T is={geometry} />
        <T.MeshStandardMaterial map={texture.lights} blending={AdditiveBlending} />
      </T.Mesh>
      <T.Mesh bind:ref={clouds} on:create={({ref}) => ref.scale.setScalar(1.01) }>
        <T is={geometry} />
        <T.MeshStandardMaterial map={texture.clouds} blending={AdditiveBlending} transparent opacity={0.5} />
      </T.Mesh>
    </T.Mesh>
    <T.Mesh on:create={({ref}) => ref.scale.setScalar(1.025)}>
      <T is={geometry} />
      <T is={atmosphereShaderMat} />
    </T.Mesh>
  {/await} 
</T.Group>
