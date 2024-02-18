<script lang="ts">
  import { T } from '@threlte/core'
  import { Stars } from '@threlte/extras'
  import { INITIAL_FOV, SOLAR_SYSTEM_RADIUS } from '$lib/constants';
  import Spaceship from './Spaceship.svelte';
  import Sun from './Sun.svelte';
  import Earth from './planets/Earth.svelte';
  import Mercury from './planets/Mercury.svelte';
  import Venus from './planets/Venus.svelte';
  import Mars from './planets/Mars.svelte';
  import Jupiter from './planets/Jupiter.svelte';
  import Saturn from './planets/Saturn.svelte';
  import Uranus from './planets/Uranus.svelte';
  import Neptune from './planets/Neptune.svelte';
</script>

<T.PerspectiveCamera
  makeDefault
  fov={INITIAL_FOV}
  far={SOLAR_SYSTEM_RADIUS * 3}
/>

<Stars radius={SOLAR_SYSTEM_RADIUS} fade={false} depth={100} factor={50} />

<Spaceship />

<Sun />
<Mercury />
<Venus />
<Earth />
<Mars />
<Jupiter />
<Saturn />
<Uranus />
<Neptune />