<script lang="ts">
  import { EARTH_RADIUS } from "$lib/constants";
  import Planet from "./Planet.svelte";
  
  const radius = EARTH_RADIUS * 3.88;
  const orbitData = {
    semiMajorAxis: 30.069,
    eccentricity: 0.0086,
    yearsPerRevolution: 164.79
  };
</script>

<Planet
  {radius}
  {orbitData}
  ringScale={1.5}
  rotationSpeed={0.1}
  tiltRadians={0.671}
  texturesPaths={{
    map: "/textures/neptune/2k_neptune.jpg",
  }}
/>