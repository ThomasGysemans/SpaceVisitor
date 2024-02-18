<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { INITIAL_FOV } from '$lib/constants';
  import Jupiter from '../planets/Jupiter.svelte';
</script>

<T.PerspectiveCamera
  makeDefault
  fov={INITIAL_FOV}
  position={[100, 5, 100]}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[-2, 0.5, 1.5]} />

<Jupiter />