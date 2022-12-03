<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { deleteInvoice } from '$lib/stores/InvoiceStore';
  import { snackbar } from '$lib/stores/SnackbarStore';
  import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
  import { createEventDispatcher } from 'svelte';

  export let invoice: Invoice;
  export let isModalShowing = false;
  const dispatch = createEventDispatcher();
</script>

<Modal isVisible={isModalShowing} on:close>
  <div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
    <div class="text-center text-xl font-bold text-daisyBush">
      Are you sure you want to delete this invoice to
      <span class="text-scarlet">{invoice.client.name}</span> for
      <span class="text-scarlet">${centsToDollars(sumLineItems(invoice.lineItems))}</span>?
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
        onClick={() => {
          deleteInvoice(invoice);
          dispatch('close');
          snackbar.send({
            message: 'Your invoice was successfully deleted.',
            type: 'success'
          });
        }}
        style="destructive"
      />
    </div>
  </div>
</Modal>
