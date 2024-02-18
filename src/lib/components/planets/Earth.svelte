<script lang="ts">
  import { EARTH_RADIUS } from "$lib/constants";
  import { T } from "@threlte/core";
  import Planet from "./Planet.svelte";

  const moonRadius = EARTH_RADIUS * 0.273;

  const earthOrbitData = {
    semiMajorAxis: 1,
    eccentricity: 0.0167,
    yearsPerRevolution: 1
  };
</script>

<Planet
  orbitData={earthOrbitData}
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
>
  <!-- the moon's orbit data isn't correct but it's fine, it looks like the real one -->
  <T.Object3D
    rotation.x={10}
  >
    <Planet
      radius={moonRadius}
      orbitData={{
        semiMajorAxis: 0.1,
        eccentricity: 0.549,
        yearsPerRevolution: 0.8
      }}
      tiltRadians={0.055}
      rotationSpeed={0.1}
      texturesPaths={{
        map: "/textures/moon/2k_moon.jpg"
      }}
    />
  </T.Object3D>
</Planet>