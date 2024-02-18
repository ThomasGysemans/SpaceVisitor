<script lang="ts">
  import Vector3Panel from "../debug/Vector3Panel.svelte";
  import Planet from "./Planet.svelte";

  let x = -62;
  let y = -10;
  let z = -30;
</script>

<!-- <Vector3Panel
  title="Earth position"
  bind:x={x}
  bind:y={y}
  bind:z={z}
/> -->

<Planet
  x={-50}
  y={0}
  z={0}
  radius={3}
  rotationSpeed={0.1}
  tiltDegrees={3.1}
  texturesPaths={{
    map: "/textures/mercury/2k_mercury.jpg",
  }}
/>