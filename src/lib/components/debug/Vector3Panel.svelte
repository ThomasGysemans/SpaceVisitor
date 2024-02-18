<script lang="ts">
  import { Pane, Slider, Text } from 'svelte-tweakpane-ui';

  export let title: string;

  export let tabPos: [number, number] = [0, 0];

  export let x: number;
  export let y: number;
  export let z: number;

  export let min = -200;
  export let max = 200;
</script>

<Pane
  {title}
  position="fixed"
  x={tabPos[0]}
  y={tabPos[1]}
>
  <Text value="Position X Y Z" />
  <Slider bind:value={x} {min} {max} />
  <Slider bind:value={y} {min} {max} />
  <Slider bind:value={z} {min} {max} />
</Pane>
