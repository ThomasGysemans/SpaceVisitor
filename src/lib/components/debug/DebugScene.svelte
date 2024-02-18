<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { INITIAL_FOV } from '$lib/constants';
  import Earth from '../planets/Earth.svelte';
</script>

<T.PerspectiveCamera
  makeDefault
  fov={INITIAL_FOV}
  position={[30, 5, 30]}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[-20, 5, 15]}
/>

<Earth />