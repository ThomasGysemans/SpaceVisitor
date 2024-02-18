<script lang="ts">
  import { EARTH_RADIUS } from "$lib/constants";
  import Planet from "./Planet.svelte";

  const orbitData = {
    semiMajorAxis: 1,
    eccentricity: 0.0167,
    yearsPerRevolution: 1
  };
</script>

<Planet
  includeLineThroughPoles
  orbitData={orbitData}
  radius={EARTH_RADIUS}
  atmosphere
  rotationSpeed={0.1}
  cloudsRotationSpeed={-0.05}
  tiltRadians={0.409}
  texturesPaths={{
    map: "/textures/earth/2k_earth_daymap.jpg",
    lights: "/textures/earth/2k_earth_nightmap.jpg",
    clouds: "/textures/earth/2k_earth_clouds.jpg",
    normalMap: "textures/earth/2k_earth_normal_map.jpg",
    specularMap: "textures/earth/2k_earth_specular_map.jpg"
  }}
/>