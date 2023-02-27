<script lang="ts">
  import Snackbar from '$lib/components/Snackbar.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Check from '$lib/components/Icon/Check.svelte';
  import { states } from '$lib/utils/states';
  import { settings, loadSettings, updateSettings } from '$lib/stores/SettingsStore';
  import { onMount } from 'svelte';
  import supabase from '$lib/utils/supabase';
  import Loader from '$lib/components/Loader.svelte';
  import { snackbar } from '$lib/stores/SnackbarStore';
  import { displayErrorMessage } from '$lib/utils/handleError';
  import Alert from '$lib/components/Alert.svelte';

  let invoiceDetailsLoading = false;
  let accountInfoLoading = false;

  let mySettings: Settings = {} as Settings;
  let accountEmail = '',
    newPassword = '',
    confirmPassword = '',
    originalEmailValue = '',
    message = '';

  const handleInvoiceDetails = async () => {
    invoiceDetailsLoading = true;
    await updateSettings(mySettings);
    invoiceDetailsLoading = false;
  };

  const handleUpdateAccount = async () => {
    console.log('update account');
    accountInfoLoading = true;
    console.log({ accountEmail, originalEmailValue, newPassword, confirmPassword });
    // if the email address hasn't changed or the password fields are empty
    if (accountEmail === originalEmailValue && !newPassword && !confirmPassword) {
      accountInfoLoading = false;
      snackbar.send({
        message: 'Please enter a new email or password.',
        type: 'error'
      });
      return;
    }

    // if the user wants to update their email
    if (accountEmail !== originalEmailValue) {
      const { error } = await supabase.auth.updateUser({
        email: accountEmail
      });

      if (error) {
        displayErrorMessage(error as Error);
        accountInfoLoading = false;
        return;
      }

      snackbar.send({
        message: 'Check your email. Please confirm the change.',
        type: 'success'
      });
      accountEmail = originalEmailValue;
    }

    // if the user wants to update their password
    if (newPassword || confirmPassword) {
      // do the new password and confirm password match?
      if (newPassword !== confirmPassword) {
        message = "The passwords don't match.";
        accountInfoLoading = false;
        return;
      }

      // update the password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) {
        displayErrorMessage(error as Error);
        return;
      }
      snackbar.send({
        message: 'Your password has been updated',
        type: 'success'
      });
    }
    accountInfoLoading = false;
  };

  onMount(async () => {
    await loadSettings();
    mySettings = { ...$settings };

    // get logged in user

    const {
      data: { user }
    } = await supabase.auth.getUser();
    accountEmail = user?.email || '';

    originalEmailValue = accountEmail;
  });
</script>

<div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16">
  <Snackbar />
  <Navbar />
  <main
    class="col-span-12 px-4 pt-4 md:col-span-8 md:col-start-4 md:pt-20 lg:col-span-6 lg:col-start-5"
  >
    <h2>Invoice Details</h2>
    <p class="mb-8">This information gets included on each invoice.</p>

    <form on:submit|preventDefault={handleInvoiceDetails}>
      <fieldset
        class="grid grid-cols-6 gap-x-5"
        disabled={invoiceDetailsLoading || accountInfoLoading}
      >
        <div class="field col-span-6">
          <label for="myName">Name</label>
          <input type="text" name="myName" id="myName" bind:value={mySettings.myName} />
        </div>
        <div class="field col-span-6">
          <label for="invoiceEmail">Send Invoices from this Email</label>
          <input type="email" name="invoiceEmail" id="invoiceEmail" bind:value={mySettings.email} />
        </div>
        <div class="field col-span-6">
          <label for="street">Address</label>
          <input type="text" name="street" id="street" bind:value={mySettings.street} />
        </div>
        <div class="field col-span-6 md:col-span-2">
          <label for="city">City</label>
          <input type="text" name="city" id="city" bind:value={mySettings.city} />
        </div>
        <div class="field col-span-6 md:col-span-2">
          <label for="state">State</label>
          <select name="state" id="state" bind:value={mySettings.state}>
            <option />
            {#each states as state}
              <option value={state.value}>{state.name}</option>
            {/each}
          </select>
        </div>
        <div class="field col-span-6 md:col-span-2">
          <label for="zip">Zip</label>
          <input type="text" name="zip" id="zip" bind:value={mySettings.zip} />
        </div>
        <div class="field col-span-6 flex justify-end">
          <button
            class="button flex translate-y-0 items-center justify-center gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
            type="submit"
          >
            {#if invoiceDetailsLoading}<Loader /> Loading...
            {:else}
              <Check />
              Save
            {/if}
          </button>
        </div>
      </fieldset>
    </form>

    <div class="col-span-6 mb-8">
      <h2>Update Account Information</h2>
      <p class="mb-2">This information is used to login to your account.</p>
      <Alert {message} className="bg-scarlet text-goldenFizz" />
    </div>
    <form on:submit|preventDefault={handleUpdateAccount}>
      <fieldset
        class="grid grid-cols-6 gap-x-5"
        disabled={invoiceDetailsLoading || accountInfoLoading}
      >
        <div class="field col-span-6">
          <label for="email">Email Address</label>
          <input type="email" name="email" bind:value={accountEmail} />
        </div>

        <div class="field col-span-6 md:col-span-3">
          <label for="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            bind:value={newPassword}
            on:focus={() => (message = '')}
          />
        </div>

        <div class="field col-span-6 md:col-span-3">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            bind:value={confirmPassword}
            on:focus={() => (message = '')}
          />
        </div>

        <div class="field col-span-6 flex justify-end">
          <button
            class="button flex translate-y-0 items-center justify-center gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
            type="submit"
          >
            {#if invoiceDetailsLoading}<Loader /> Loading...
            {:else}
              <Check />
              Save
            {/if}
          </button>
        </div>
      </fieldset>
    </form>
  </main>
</div>

<style lang="postcss">
  h2 {
    @apply mb-1 text-3xl font-black text-daisyBush;
  }
</style>
