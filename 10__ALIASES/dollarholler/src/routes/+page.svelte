<script lang="ts">
  import Header from '$lib/Header.svelte';
  import { addTwo } from '$utils/mathHelpers';
</script>

{addTwo(1, 2)}
<Header />
<h1 class="text-3xl font-bold underline">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
