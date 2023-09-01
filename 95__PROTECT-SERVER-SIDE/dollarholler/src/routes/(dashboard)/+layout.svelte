<script lang="ts">
  import Authenticated from '$lib/components/Authenticated.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Snackbar from '$lib/components/Snackbar.svelte';
</script>

<Authenticated>
  <Snackbar />
  <div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16">
    <Navbar />
    <main class="col-span-12 px-4 pt-4 md:col-span-8 md:pt-10">
      <slot><!-- optional fallback --></slot>
    </main>
  </div>
</Authenticated>
