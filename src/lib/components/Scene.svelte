<script lang="ts">
  import { T } from '@threlte/core'
  import { Stars } from '@threlte/extras'
  import { INITIAL_FOV, SOLAR_SYSTEM_RADIUS } from '$lib/constants';
  import Spaceship from './Spaceship.svelte';
  import Sun from './Sun.svelte';
  import Earth from './planets/Earth.svelte';
  import Mercury from './planets/Mercury.svelte';
  import Venus from './planets/Venus.svelte';
</script>

<T.PerspectiveCamera
  makeDefault
  fov={INITIAL_FOV}
/>

<Stars radius={SOLAR_SYSTEM_RADIUS} />

<Sun />
<Spaceship />
<Earth />
<Mercury />
<Venus />