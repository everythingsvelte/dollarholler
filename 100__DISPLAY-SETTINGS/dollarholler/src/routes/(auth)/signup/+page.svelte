<script lang="ts">
  import supabase from '$lib/utils/supabase';
  import Alert from '$lib/components/Alert.svelte';
  import Loader from '$lib/components/Loader.svelte';

  let fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
    message: string = '',
    isSignupFormShowing: boolean = true,
    isLoading: boolean = false;

  const handleSubmit = async () => {
    isLoading = true;
    message = '';

    // make sure that the password and the confirm password match
    if (password !== confirmPassword) {
      message = "Your password and confirm password don't match";
      isLoading = false;
      return;
    }

    // sign up the user
    let userResults = await supabase.auth.signUp({ email, password });

    if (userResults.error) {
      message = userResults.error.message;
      console.error(userResults.error);
      isLoading = false;
      return;
    }

    // add the full name to the settings table
    if (userResults?.data?.user?.id) {
      const settingsResults = await supabase
        .from('settings')
        .insert([{ myName: fullName, userId: userResults.data.user.id }]);

      if (settingsResults.error) {
        message = settingsResults.error.message;
        console.error(settingsResults.error);
        isLoading = false;
        return;
      }
    }

    isSignupFormShowing = false;
    isLoading = false;
  };
</script>

{#if isSignupFormShowing}
  <h1 class="auth-heading">Sign Up</h1>
  <Alert {message} />
  <form on:submit|preventDefault={handleSubmit}>
    <fieldset disabled={isLoading}>
      <div class="field">
        <label for="fullName" class="text-goldenFizz">Full Name</label>
        <input type="text" name="fullName" id="fullName" required bind:value={fullName} />
      </div>
      <div class="field">
        <label for="email" class="text-goldenFizz">Email Address</label>
        <input type="email" name="email" id="email" required bind:value={email} />
      </div>
      <div class="field">
        <label for="password" class="text-goldenFizz">Password</label>
        <input type="password" name="password" id="password" required bind:value={password} />
      </div>
      <div class="field">
        <label for="confirmPassword" class="text-goldenFizz">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          bind:value={confirmPassword}
        />
      </div>
      <button type="submit" class="auth-button flex items-center justify-center gap-x-2">
        {#if isLoading}
          <Loader /> Loading
        {:else}
          Count me in!
        {/if}</button
      >
      <p class="mt-4 text-center text-sm text-white">
        <a href="/login" class="underline hover:no-underline">Already have an account?</a>
      </p>
    </fieldset>
  </form>
{:else}
  <Alert message="Check your email for the confirmation link." />
  <a href="/login" class="auth-button block text-center">Login</a>
{/if}
