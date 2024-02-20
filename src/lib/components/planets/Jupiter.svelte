<script lang="ts">
  import { EARTH_RADIUS } from "$lib/constants";
  import Planet from "./Planet.svelte";
  
  const radius = EARTH_RADIUS * 11.21;
  const orbitData = {
    semiMajorAxis: 5.203,
    eccentricity: 0.0484,
    yearsPerRevolution: 11.86
  };
</script>

<Planet
  uniqueId="Jupiter"
  {radius}
  {orbitData}
  rotationSpeed={0.1}
  tiltRadians={0.054}
  texturesPaths={{
    map: "/textures/jupiter/4k_jupiter.jpg",
  }}
/>