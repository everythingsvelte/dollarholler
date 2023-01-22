<script>
  import supabase from '$lib/utils/supabase';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import '../app.css';

  onMount(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      invalidate('supabase:auth');
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<slot />
