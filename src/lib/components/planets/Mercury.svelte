<script lang="ts">
  import { EARTH_RADIUS } from "$lib/constants";
  import Planet from "./Planet.svelte";

  const radius = EARTH_RADIUS * 0.38;
  const orbitData = {
    semiMajorAxis: 0.387,
    eccentricity: 0.2056,
    yearsPerRevolution: 0.24,
  };
</script>

<Planet
  uniqueId="Mercury"
  {orbitData}
  {radius}
  rotationSpeed={0.1}
  tiltRadians={0.034}
  texturesPaths={{
    map: "/textures/mercury/2k_mercury.jpg",
  }}
/>