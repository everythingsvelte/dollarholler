<script lang="ts">
  import Alert from '$lib/components/Alert.svelte';

  export let form;
  export let email = form?.values.email || '';

</script>

<h1 class="auth-heading">Login</h1>

<form method="POST">
  <Alert message={form?.error} />
  <fieldset>
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
      <input name="password" type="password" placeholder="Your password" />
    </div>
    <div class="field">
      <button type="submit" class="auth-button flex items-center justify-center gap-x-2">
        Let's do this!
      </button>
      <p class="mt-4 text-center text-sm text-white">
        <a href="/signup" class="hover-no-underline underline">Don't have an account yet?</a>
      </p>
    </div>
  </fieldset>
</form>
