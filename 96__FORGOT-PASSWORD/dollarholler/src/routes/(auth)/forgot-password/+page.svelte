<script lang="ts">
  import supabase from '$lib/utils/supabase';
  import { env } from '$env/dynamic/public';
  import Alert from '$lib/components/Alert.svelte';
  import Loader from '$lib/components/Loader.svelte';

  let email = '',
    message = '';
  let loading = false;

  const handleSubmit = async () => {
    loading = true;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${env.PUBLIC_URL}/reset-password`
    });

    if (error) {
      message = error.message;
    } else {
      message = 'Check your email for the password reset link!';
    }

    loading = false;
  };
</script>

<h1 class="auth-heading">Forgot Password</h1>

<form on:submit|preventDefault={handleSubmit}>
  <Alert {message} />
  <fieldset disabled={loading}>
    <div class="field">
      <label for="email" class="text-goldenFizz">Email Address</label>
      <input type="email" name="email" placeholder="Your Email" bind:value={email} required />
    </div>
    <button type="submit" class="auth-button center gap-x-2">
      {#if loading}<Loader /> Loading{:else}Send me a Reset Email!{/if}</button
    >
    <p class="mt-4 text-center text-sm text-white">
      <a href="/login" class="underline hover:no-underline">Ready to login?</a>
    </p>
  </fieldset>
</form>
