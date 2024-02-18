<script lang="ts">
  import { type PerspectiveCamera, SphereGeometry, Mesh } from "three";
  import { T, useTask, useThrelte } from "@threlte/core";
  import { useTexture } from "@threlte/extras";
  import { onMount } from "svelte";
  import fresnel from "$lib/fresnel";
  import {
    EffectComposer,
    EffectPass,
    RenderPass,
    SMAAEffect,
    SMAAPreset,
    BloomEffect,
    KernelSize
  } from 'postprocessing';

  const { scene, renderer, camera, size, renderStage, autoRender } = useThrelte();

  // Adapt the default WebGLRenderer: https://github.com/pmndrs/postprocessing#usage
  const composer = new EffectComposer(renderer);

  const setupEffectComposer = (camera: PerspectiveCamera) => {
    composer.removeAllPasses()
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(
      new EffectPass(
        camera,
        new BloomEffect({
          intensity: 1,
          luminanceThreshold: 0.15,
          height: 256,
          width: 256,
          luminanceSmoothing: 0.08,
          mipmapBlur: true,
          kernelSize: KernelSize.VERY_SMALL
        })
      )
    )
    composer.addPass(
      new EffectPass(
        camera,
        new SMAAEffect({
          preset: SMAAPreset.LOW
        })
      )
    )
  };

  // We need to set up the passes according to the camera in use
  $: setupEffectComposer($camera as PerspectiveCamera);
  $: composer.setSize($size.width, $size.height);

  const numLights = 10; // the number of lights around the Sun (to make it look like the Sun is emitting the light in all directions)
  const radius = 15;
  const extendedRadius = radius + 15; // the radius in which the lights will be placed evenly around the Sun
  const geometry = new SphereGeometry(radius, 32, 32);
  const atmosphereShaderMat = fresnel({ rimHex: 0xffb300 });

  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  let sun: Mesh;

  onMount(() => {
    let before = autoRender.current;
    autoRender.set(false);
    return () => autoRender.set(before);
  });

  useTask((delta) => {
    composer.render(delta);
    sun.rotation.y += 0.03 * delta;
  }, { stage: renderStage, autoInvalidate: false });
</script>

{#each Array(numLights) as _, i (i + "-sun-light")}
  {@const theta = 2 * Math.PI * i / goldenRatio}
  {@const phi = Math.acos(1 - 2 * i / numLights)}
  {@const x = extendedRadius * Math.sin(phi) * Math.cos(theta)}
  {@const y = extendedRadius * Math.sin(phi) * Math.sin(theta)}
  {@const z = extendedRadius * Math.cos(phi)}
  <T.PointLight
    args={[0xffffff, 20, 300, 0.7]}
    position.x={x}
    position.y={y}
    position.z={z}
    castShadow
  />
{/each}

<T.Group>
  <T.Mesh bind:ref={sun}>
    <T is={geometry} />
    {#await useTexture("/textures/sun/sun2k.jpg") then value}
      <T.MeshStandardMaterial color="yellow" map={value} />
    {/await}
  </T.Mesh>
  <T.Mesh on:create={({ref}) => ref.scale.setScalar(1.025)}>
    <T is={geometry} />
    <T is={atmosphereShaderMat} />
  </T.Mesh>
</T.Group>