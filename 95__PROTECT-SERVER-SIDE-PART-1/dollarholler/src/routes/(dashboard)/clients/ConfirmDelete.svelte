<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { deleteClient } from '$lib/stores/ClientStore';
  import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
  import { createEventDispatcher } from 'svelte';

  export let client: Client;
  export let isModalShowing = false;
  const dispatch = createEventDispatcher();

  const handleDelete = async () => {
    await deleteClient(client);
    dispatch('close');
  };
</script>

<Modal isVisible={isModalShowing} on:close>
  <div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
    <div class="text-center text-xl font-bold text-daisyBush">
      Are you sure you want to delete this <span class="text-scarlet">{client.name}</span> and all their
      invoice(s)?
    </div>
    <div class="flex gap-4">
      <Button
        isAnimated={false}
        label="Cancel"
        onClick={() => {
          dispatch('close');
        }}
        style="secondary"
      />
      <Button
        isAnimated={false}
        label="Yes, Delete It"
        onClick={handleDelete}
        style="destructive"
      />
    </div>
  </div>
</Modal>
