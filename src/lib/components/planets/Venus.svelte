<script lang="ts">
  import Planet from "./Planet.svelte";

  const orbitData = {
    semiMajorAxis: 0.723,
    eccentricity: 0.0068,
    yearsPerRevolution: 0.62
  };
</script>

<Planet
  includeLineThroughPoles
  orbitData={orbitData}
  radius={3.8}
  rotationSpeed={0.1}
  tiltRadians={0.046}
  texturesPaths={{
    map: "/textures/venus/2k_venus_atmosphere.jpg",
  }}
/>