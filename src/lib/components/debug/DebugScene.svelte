<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { INITIAL_FOV } from '$lib/constants';
  import Venus from '../planets/Venus.svelte';
</script>

<T.PerspectiveCamera
  makeDefault
  fov={INITIAL_FOV}
  position={[0, 5, 10]}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[-2, 0.5, 1.5]} />

<Venus />