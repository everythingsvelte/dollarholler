<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Arrow from './Icon/Arrow.svelte';
  import Overlay from './Overlay.svelte';
  import Portal from './Portal.svelte';

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
    class="shadow-slidePanel fixed right-0 top-0 z-slidePanel h-screen w-full overflow-y-scroll bg-white px-5 pt-16 lg:w-3/4 lg:py-20 lg:px-32"
  >
    <button
      class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
      on:click={() => dispatch('closePanel')}
    >
      <Arrow />
    </button>
    <slot />
  </div>
</Portal>
