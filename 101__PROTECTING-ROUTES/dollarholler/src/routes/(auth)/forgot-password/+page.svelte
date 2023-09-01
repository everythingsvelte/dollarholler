<script lang="ts">
  import Alert from '$lib/components/Alert.svelte'

  export let form;
  export let email = form?.values?.email || '';
</script>

<h1 class="auth-heading">Forgot Password</h1>

<form method="POST">
  {#if form?.success}
    <Alert message="Check your email for the password reset link!" />
  {:else}
  <Alert message={form?.error} />
  <div class="field">
    <label for="email" class="text-goldenFizz">Email Address</label>
    <input type="email" name="email" placeholder="Your Email" required bind:value={email} />
  </div>
  <button type="submit" class="auth-button"> Send me a Reset Email! </button>
  <p class="mt-4 text-center text-sm text-white">
    <a href="/login" class="underline hover:no-underline">Ready to login?</a>
  </p>
  {/if}
</form>
