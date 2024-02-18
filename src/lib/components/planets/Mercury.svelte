<script lang="ts">
  import Planet from "./Planet.svelte";

  const orbitData = {
    semiMajorAxis: 0.39,
    eccentricity: 0.2056,
    yearsPerRevolution: 0.24,
  };
</script>

<Planet
  includeLineThroughPoles
  orbitData={orbitData}
  radius={3}
  rotationSpeed={0.1}
  tiltRadians={0.41}
  texturesPaths={{
    map: "/textures/mercury/2k_mercury.jpg",
  }}
/>