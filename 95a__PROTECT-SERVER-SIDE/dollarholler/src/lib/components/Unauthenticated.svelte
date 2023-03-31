<script lang="ts">
  import supabase from '$lib/utils/supabase';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(async () => {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();

    if (session) {
      await goto('/invoices');
      return;
    }
  });
</script>

<slot><!-- optional fallback --></slot>
