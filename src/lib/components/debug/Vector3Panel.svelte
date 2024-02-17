<script lang="ts">
  import { Pane, Slider, Text } from 'svelte-tweakpane-ui';

  export let title: string;

  export let tabPos: [number, number] = [0, 0];

  export let x: number;
  export let y: number;
  export let z: number;
</script>

<Pane
  {title}
  position="fixed"
  x={tabPos[0]}
  y={tabPos[1]}
>
  <Text value="pos X" />
  <Slider
    bind:value={x}
    min={-50}
    max={50}
  />
  <Text value="pos Y" />
  <Slider
    bind:value={y}
    min={-50}
    max={50}
  />
  <Text value="pos Z" />
  <Slider
    bind:value={z}
    min={-50}
    max={50}
  />
</Pane>


