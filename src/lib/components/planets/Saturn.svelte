<script lang="ts">
  import { EARTH_RADIUS } from "$lib/constants";
  import Planet from "./Planet.svelte";
  
  const radius = EARTH_RADIUS * 9.45;
  const orbitData = {
    semiMajorAxis: 9.537,
    eccentricity: 0.0542,
    yearsPerRevolution: 29.46
  };
</script>

<Planet
  uniqueId="Saturn"
  {radius}
  {orbitData}
  ringScale={3}
  rotationSpeed={0.1}
  tiltRadians={0.466}
  texturesPaths={{
    map: "/textures/saturn/2k_saturn.jpg",
    ring: "/textures/saturn/saturn_ring.png"
  }}
/>