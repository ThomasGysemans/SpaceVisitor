<script lang="ts">
  import { EARTH_RADIUS } from "$lib/constants";
  import Planet from "./Planet.svelte";
  
  const radius = EARTH_RADIUS * 4.01;
  const orbitData = {
    semiMajorAxis: 19.191,
    eccentricity: 0.0472,
    yearsPerRevolution: 84.01
  };
</script>

<Planet
  {radius}
  {orbitData}
  ringScale={1.5}
  rotationSpeed={0.1}
  tiltRadians={0.718}
  texturesPaths={{
    map: "/textures/uranus/2k_uranus.jpg",
    ring: "/textures/uranus/uranus_ring.png"
  }}
/>