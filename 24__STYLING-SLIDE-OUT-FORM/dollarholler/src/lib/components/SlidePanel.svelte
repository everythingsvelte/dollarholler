<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Portal from '$lib/components/Portal.svelte';
  import Arrow from './Icon/Arrow.svelte';
  import Overlay from './Overlay.svelte';

  const dispatch = createEventDispatcher();
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }}
/>

<Portal>
  <Overlay />
  <div
    class="fixed right-0 top-0 z-slidePanel h-screen w-3/4 bg-white py-20 px-32 shadow-slidePanel"
  >
    <button
      class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
      on:click={() => dispatch('closePanel')}><Arrow /></button
    >
    <slot><!-- optional fallback --></slot>
  </div>
</Portal>
