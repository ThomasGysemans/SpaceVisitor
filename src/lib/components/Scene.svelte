<script lang="ts">
  import { T } from '@threlte/core'
  import { Stars } from '@threlte/extras'
  import { INITIAL_FOV } from '$lib/constants';
  import Spaceship from './Spaceship.svelte';
  import Sun from './Sun.svelte';
  import Earth from './planets/Earth.svelte';
  import Mercury from './planets/Mercury.svelte';
</script>

<T.PerspectiveCamera
  makeDefault
  fov={INITIAL_FOV}
/>

<Sun />
<Stars />
<Spaceship />
<Earth />
<Mercury />