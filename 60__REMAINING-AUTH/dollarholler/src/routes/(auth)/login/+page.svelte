<script lang="ts">
  import Alert from '$lib/components/Alert.svelte';
  let email: string,
    password: string,
    alertMessage = '';
</script>

<h1 class="mb-4 text-[2.5rem] font-black text-goldenFizz">Login</h1>

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
    <button
      type="submit"
      class="mt-6 min-h-[3.5rem] w-full rounded-lg bg-robinEggBlue py-3 px-4 text-xl font-bold text-daisyBush transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      Let's do this!
    </button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/signup" class="hover-no-underline underline">Don't have an account yet?</a>
    </p>
  </div>
</form>
