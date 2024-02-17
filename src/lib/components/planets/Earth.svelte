<script lang="ts">
  import Planet from "./Planet.svelte";
</script>

<Planet
  x={-20}
  y={58}
  z={-35}
  radius={4}
  atmosphere
  rotationSpeed={0.1}
  cloudsRotationSpeed={-0.05}
  tiltDegrees={-23.4}
  texturesPaths={{
    map: "/textures/earth/2k_earth_daymap.jpg",
    lights: "/textures/earth/2k_earth_nightmap.jpg",
    clouds: "/textures/earth/2k_earth_clouds.jpg",
    normalMap: "textures/earth/2k_earth_normal_map.jpg"
  }}
/>