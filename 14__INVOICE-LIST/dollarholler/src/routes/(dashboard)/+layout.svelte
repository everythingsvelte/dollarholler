<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16">
  <Navbar />
  <main class="col-span-12 md:col-span-8 md:pt-10"><slot><!-- optional fallback --></slot></main>
</div>
