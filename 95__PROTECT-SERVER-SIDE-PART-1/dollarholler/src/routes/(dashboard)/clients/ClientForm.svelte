<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import Check from '$lib/components/Icon/Check.svelte';
  import { states } from '$lib/utils/states';
  import { addClient, updateClient } from '$lib/stores/ClientStore';
  import { snackbar } from '$lib/stores/SnackbarStore';
  import ConfirmDelete from './ConfirmDelete.svelte';

  export let client: Client = {} as Client;
  export let formStatus: 'create' | 'edit' = 'create';
  let isModalShowing = false;

  export let closePanel: () => void = () => {};

  const handleSubmit = () => {
    if (formStatus === 'create') {
      addClient(client);
    } else {
      updateClient(client);
      snackbar.send({
        message: 'Your client was successfully updated.',
        type: 'success'
      });
    }
    closePanel();
  };
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  {#if formStatus === 'create'}Add{:else}Edit{/if} a Client
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <div class="field col-span-6">
    <label for="name">Client Name</label>
    <input type="text" name="name" required bind:value={client.name} />
  </div>

  <div class="field col-span-6">
    <label for="email">Email Address</label>
    <input type="email" name="email" required bind:value={client.email} />
  </div>

  <div class="field col-span-6">
    <label for="street">Address</label>
    <input type="text" name="street" bind:value={client.street} />
  </div>

  <div class="field col-span-2">
    <label for="city">City</label>
    <input type="text" name="city" bind:value={client.city} />
  </div>

  <div class="field col-span-2">
    <label for="state">State</label>
    <select name="state" id="state" bind:value={client.state}>
      <option />
      {#each states as state}
        <option value={state.value}>{state.name}</option>
      {/each}
    </select>
  </div>

  <div class="field col-span-2">
    <label for="zip">Zip</label>
    <input type="text" name="zip" minlength="5" bind:value={client.zip} />
  </div>

  <div class="field col-span-3">
    {#if formStatus === 'edit'}
      <Button
        label="Delete"
        onClick={() => {
          isModalShowing = true;
        }}
        isAnimated={false}
        style="textOnlyDestructive"
        iconLeft={Trash}
      />
    {/if}
  </div>
  <div class="field col-span-3 flex justify-end gap-x-5">
    <Button label="Cancel" style="secondary" onClick={closePanel} isAnimated={false} />
    <button
      class="button flex translate-y-0 items-center justify-center gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
      type="submit"
    >
      <Check />
      Submit
    </button>
  </div>
</form>

<ConfirmDelete
  {client}
  {isModalShowing}
  on:close={() => {
    isModalShowing = false;
  }}
/>
