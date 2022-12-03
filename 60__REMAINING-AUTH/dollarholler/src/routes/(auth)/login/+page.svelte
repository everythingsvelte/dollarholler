<script lang="ts">
  import Alert from '$lib/components/Alert.svelte';
  let email: string,
    password: string,
    alertMessage = '';
</script>

<h1 class="auth-heading">Login</h1>

<form>
  <Alert message={alertMessage} />
  <div class="field">
    <label for="email" class="text-goldenFizz">Email Address</label>
    <input type="email" name="email" placeholder="Your Email" bind:value={email} />
  </div>
  <div class="field">
    <div class="flex justify-between">
      <label for="password" class="text-goldenFizz">Password</label>
      <a href="/forgot-password" class="text-sm text-white underline hover:no-underline">Forgot?</a>
    </div>
    <input type="password" placeholder="Your password" bind:value={password} />
  </div>
  <div class="field">
    <button type="submit" class="auth-button"> Let's do this! </button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/signup" class="hover-no-underline underline">Don't have an account yet?</a>
    </p>
  </div>
</form>
