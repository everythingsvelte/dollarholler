<script lang="ts">
  import supabase from '$lib/utils/supabase';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(async () => {
    let { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
    }

    goto('/login');
  });
</script>
