<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import Arrow from '$lib/components/Icon/Arrow.svelte';

  let previousPage: string | undefined = undefined;

  afterNavigate((navigation) => {
    previousPage = navigation?.from?.url?.pathname;
  });
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      goto(previousPage || '/invoices');
    }
  }}
/>

<div class="h-full min-h-screen w-screen bg-whisper pt-16 pb-32 lg:pt-12">
  <main class="mx-auto min-h-screen max-w-screen-lg">
    <a href={previousPage ? previousPage : '/invoices'} class="fixed top-7 left-7 text-pastelPurple"
      ><Arrow /></a
    >
    <slot><!-- optional fallback --></slot>
  </main>
</div>
