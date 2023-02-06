<script lang="ts">
  import Alert from '$lib/components/Alert.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import supabase from '$lib/utils/supabase';
  import { goto } from '$app/navigation';

  let email: string,
    password: string,
    message = '',
    isLoading = false;

  const handleSubmit = async () => {
    isLoading = true;
    message = '';
    let { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      message = error.message;
      console.error(error);
    } else {
      goto('/invoices');
    }

    isLoading = false;
  };
</script>

<h1 class="auth-heading">Login</h1>

<form on:submit|preventDefault={handleSubmit}>
  <Alert {message} />
  <fieldset disabled={isLoading}>
    <div class="field">
      <label for="email" class="text-goldenFizz">Email Address</label>
      <input type="email" name="email" placeholder="Your Email" bind:value={email} />
    </div>
    <div class="field">
      <div class="flex justify-between">
        <label for="password" class="text-goldenFizz">Password</label>
        <a href="/forgot-password" class="text-sm text-white underline hover:no-underline"
          >Forgot?</a
        >
      </div>
      <input type="password" placeholder="Your password" bind:value={password} />
    </div>
    <div class="field">
      <button type="submit" class="auth-button flex items-center justify-center gap-x-2">
        {#if isLoading}
          <Loader /> Loading
        {:else}
          Let's do this!
        {/if}
      </button>
      <p class="mt-4 text-center text-sm text-white">
        <a href="/signup" class="hover-no-underline underline">Don't have an account yet?</a>
      </p>
    </div>
  </fieldset>
</form>
