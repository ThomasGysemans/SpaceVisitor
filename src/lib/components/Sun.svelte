<script lang="ts">
  import { Vector3, type PerspectiveCamera } from "three";
  import { T, useTask, useThrelte } from "@threlte/core";
  import { onMount } from "svelte";
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

  const numLights = 8; // the number of lights around the Sun (to make it look like the Sun is emitting the light in all directions)

  let sunX = 0;
  let sunY = 0;
  let sunZ = 0;

  onMount(() => {
    let before = autoRender.current;
    autoRender.set(false);
    return () => autoRender.set(before);
  });

  useTask((delta) => {
    composer.render(delta)
  }, { stage: renderStage, autoInvalidate: false });
</script>

{#each Array(numLights) as _, i (i + "-directional-light")}
  {@const phi = Math.acos(-1 + (2 * i) / numLights)}
  {@const theta = Math.sqrt(numLights * Math.PI) * phi}
  {@const x = Math.cos(theta) * Math.sin(phi)}
  {@const y = Math.sin(theta) * Math.sin(phi)}
  {@const z = Math.cos(phi)}
  {@const position = new Vector3(x, y, z).normalize()}
  <T.DirectionalLight
    args={[0xffffff, 3]}
    position.x={position.x}
    position.y={position.y}
    position.z={position.z}
    castShadow
  />
{/each}

<T.DirectionalLight
  args={[0xffffff, 3]}
  position.x={0}
  position.y={0}
  position.z={0}
/>

<T.AmbientLight intensity={0.1} />

<T.Mesh position={[sunX, sunY, sunZ]}>
  <T.SphereGeometry args={[15, 32, 32]} />
  <T.MeshStandardMaterial color="yellow" />
</T.Mesh>