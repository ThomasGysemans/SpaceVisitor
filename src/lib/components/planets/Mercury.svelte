<script lang="ts">
  import Planet from "./Planet.svelte";
</script>

<Planet
  x={-62}
  y={-10}
  z={-30}
  radius={3}
  rotationSpeed={0.1}
  tiltDegrees={3.1}
  texturesPaths={{
    map: "/textures/mercury/2k_mercury.jpg",
  }}
/>