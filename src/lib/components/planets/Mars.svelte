<script lang="ts">
  import { EARTH_RADIUS } from "$lib/constants";
  import Planet from "./Planet.svelte";
  
  const radius = EARTH_RADIUS * 0.53;
  const orbitData = {
    semiMajorAxis: 1.524,
    eccentricity: 0.0934,
    yearsPerRevolution: 1.88
  };
</script>

<Planet
  uniqueId="Mars"
  atmosphere
  atmosphereColor={0xffb3a3}
  atmosphereScale={0.5}
  {radius}
  {orbitData}
  rotationSpeed={0.1}
  tiltRadians={0.439}
  texturesPaths={{
    map: "/textures/mars/2k_mars.jpg",
  }}
/>