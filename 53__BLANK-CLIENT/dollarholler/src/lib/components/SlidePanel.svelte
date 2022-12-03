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
    class="fixed right-0 top-0 z-slidePanel h-screen w-full overflow-y-scroll bg-white px-5 pt-16 shadow-slidePanel lg:w-3/4 lg:py-20 lg:px-32"
  >
    <button
      class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
      on:click={() => dispatch('closePanel')}><Arrow /></button
    >
    <slot><!-- optional fallback --></slot>
  </div>
</Portal>
