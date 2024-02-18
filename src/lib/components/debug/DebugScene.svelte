<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { INITIAL_FOV } from '$lib/constants';
  import Uranus from '../planets/Uranus.svelte';
</script>

<T.PerspectiveCamera
  makeDefault
  fov={INITIAL_FOV}
  position={[120, 5, 120]}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[-20, 5, 15]}
/>

<Uranus />