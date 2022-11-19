<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import Arrow from '$lib/components/Icon/Arrow.svelte';

  let previousPage: string | undefined;
  afterNavigate((navigation) => {
    previousPage = navigation?.from?.url?.pathname;
  });
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      goto(previousPage || '/');
    }
  }}
/>

<div class="h-full min-h-screen w-screen bg-whisper pt-12 pb-32">
  <a href={previousPage ? previousPage : '/'} class="fixed top-7 left-7 text-pastelPurple"
    ><Arrow /></a
  >
  <main class="mx-auto min-h-screen max-w-screen-lg">
    <slot><!-- optional fallback --></slot>
  </main>
</div>
