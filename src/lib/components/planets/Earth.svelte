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
  tilt={-23.4 * Math.PI / 180}
  texturesPaths={{
    map: "/textures/new_earth/2k_earth_daymap.jpg",
    lights: "/textures/new_earth/2k_earth_nightmap.jpg",
    clouds: "/textures/new_earth/2k_earth_clouds.jpg",
    normalMap: "textures/new_earth/2k_earth_normal_map.jpg"
  }}
/>