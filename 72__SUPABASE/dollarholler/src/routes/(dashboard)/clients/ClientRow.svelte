<script lang="ts">
  import { clickOutside } from '$lib/actions/ClickOutside';
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import View from '$lib/components/Icon/View.svelte';
  import Edit from '$lib/components/Icon/Edit.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import Activate from '$lib/components/Icon/Activate.svelte';
  import Archive from '$lib/components/Icon/Archive.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ClientForm from './ClientForm.svelte';

  export let client: Client;
  console.log({ client });

  let isAdditionalMenuShowing = false;

  let isClientFormShowing = false;

  const closePanel = () => {
    isClientFormShowing = false;
  };

  const receivedInvoices = () => {
    if (client?.invoices) {
      // find invoices that have been paid
      const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');

      // get the sum of all of them
      return sumInvoices(paidInvoices);
    }
    return 0;
  };

  const balanceInvoices = () => {
    if (client?.invoices) {
      // find invoices that have NOT been paid
      const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus !== 'paid');

      // get the sum of all of them
      return sumInvoices(paidInvoices);
    }
    return 0;
  };

  const handleEdit = () => {
    isClientFormShowing = true;
    isAdditionalMenuShowing = false;
  };
</script>

<div class="client-table rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
  <div><Tag className="ml-auto" label={client.clientStatus} /></div>
  <div class="truncate whitespace-nowrap text-base font-bold lg:text-xl">{client.name}</div>
  <div class="text-right font-mono text-sm font-bold lg:text-lg">
    ${centsToDollars(receivedInvoices())}
  </div>
  <div class="text-right font-mono text-sm font-bold text-scarlet lg:text-lg">
    ${centsToDollars(balanceInvoices())}
  </div>
  <div class="relative hidden items-center justify-center lg:flex">
    <a href={`/clients/${client.id}`} class="text-pastelPurple hover:text-daisyBush"><View /></a>
  </div>
  <div
    class="relative hidden items-center justify-center lg:flex"
    use:clickOutside={() => {
      isAdditionalMenuShowing = false;
    }}
  >
    <button
      class="text-pastelPurple hover:text-daisyBush"
      on:click={() => {
        isAdditionalMenuShowing = !isAdditionalMenuShowing;
      }}><ThreeDots /></button
    >
    {#if isAdditionalMenuShowing}
      <AdditionalOptions
        options={[
          { label: 'Edit', icon: Edit, onClick: handleEdit, disabled: false },
          {
            label: 'Activate',
            icon: Activate,
            onClick: () => {
              client.clientStatus = 'active';
              isAdditionalMenuShowing = false;
            },
            disabled: client.clientStatus === 'active'
          },
          {
            label: 'Archive',
            icon: Archive,
            onClick: () => {
              client.clientStatus = 'archive';
              isAdditionalMenuShowing = false;
            },
            disabled: client.clientStatus === 'archive'
          },
          { label: 'Delete', icon: Trash, onClick: () => console.log('deleting'), disabled: false }
        ]}
      />
    {/if}
  </div>
</div>

{#if isClientFormShowing}
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm {closePanel} formStatus="edit" {client} />
  </SlidePanel>
{/if}
