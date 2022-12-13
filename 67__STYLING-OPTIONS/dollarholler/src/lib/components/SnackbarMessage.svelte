<script lang="ts">
  import { snackbar } from '$lib/stores/SnackbarStore';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  export let message: string = '';

  let progress = tweened(100, { duration: 3000 });

  onMount(async () => {
    await progress.set(0);
    snackbar.remove();
  });
</script>

<div class="whitespace-nowrap">
  {message}
</div>
