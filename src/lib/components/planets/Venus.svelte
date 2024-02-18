<script lang="ts">
  import { EARTH_RADIUS } from "$lib/constants";
  import Planet from "./Planet.svelte";
  
  const radius = EARTH_RADIUS * 0.95;
  const orbitData = {
    semiMajorAxis: 0.723,
    eccentricity: 0.0068,
    yearsPerRevolution: 0.62
  };
</script>

<Planet
  includeLineThroughPoles
  {orbitData}
  {radius}
  rotationSpeed={0.1}
  tiltRadians={2.64}
  texturesPaths={{
    map: "/textures/venus/2k_venus_atmosphere.jpg",
  }}
/>