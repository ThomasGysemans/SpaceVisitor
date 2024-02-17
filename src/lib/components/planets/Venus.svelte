<script lang="ts">
  import Planet from "./Planet.svelte";
</script>

<Planet
  x={30}
  y={30}
  z={-30}
  radius={3.8}
  rotationSpeed={0.1}
  tiltDegrees={177.36}
  texturesPaths={{
    map: "/textures/venus/2k_venus_atmosphere.jpg",
  }}
/>