<script lang="ts">
  import Planet from "./Planet.svelte";

  let x = -20;
  let y = 58;
  let z = -35;
</script>

<Planet
  x={x}
  y={y}
  z={z}
  radius={4}
  atmosphere
  rotationSpeed={0.1}
  cloudsRotationSpeed={-0.05}
  tiltDegrees={-23.4}
  texturesPaths={{
    map: "/textures/earth/2k_earth_daymap.jpg",
    lights: "/textures/earth/2k_earth_nightmap.jpg",
    clouds: "/textures/earth/2k_earth_clouds.jpg",
    normalMap: "textures/earth/2k_earth_normal_map.jpg",
    specularMap: "textures/earth/2k_earth_specular_map.jpg"
  }}
/>