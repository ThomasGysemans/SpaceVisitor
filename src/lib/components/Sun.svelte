<script lang="ts">
  import { type PerspectiveCamera, SphereGeometry, Mesh } from "three";
  import { T, useTask, useThrelte } from "@threlte/core";
  import { useTexture } from "@threlte/extras";
  import { SUN_RADIUS } from "$lib/constants";
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

  const composer = new EffectComposer(renderer);

  const setupEffectComposer = (camera: PerspectiveCamera) => {
    composer.removeAllPasses();
    composer.addPass(new RenderPass(scene, camera));
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
    );
    composer.addPass(
      new EffectPass(
        camera,
        new SMAAEffect({
          preset: SMAAPreset.LOW
        })
      )
    );
  };

  // We need to set up the passes according to the camera in use
  $: setupEffectComposer($camera as PerspectiveCamera);
  $: composer.setSize($size.width, $size.height);

  const geometry = new SphereGeometry(SUN_RADIUS, 32, 32);
  const atmosphereShaderMat = fresnel({ rimHex: 0xffb300 });

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

<T.PointLight args={[0xffffff, 4, 0, 0]} />

<T.Group>
  <T.Mesh bind:ref={sun}>
    <T is={geometry} />
    {#await useTexture("/textures/sun/sun2k.jpg") then value}
      <T.MeshStandardMaterial emissiveMap={value} emissive={0xffd700} emissiveIntensity={6} />
    {/await}
  </T.Mesh>
  <T.Mesh on:create={({ref}) => ref.scale.setScalar(1.025)} userData={{uniqueId: "Sun"}}>
    <T is={geometry} />
    <T is={atmosphereShaderMat} />
  </T.Mesh>
</T.Group>