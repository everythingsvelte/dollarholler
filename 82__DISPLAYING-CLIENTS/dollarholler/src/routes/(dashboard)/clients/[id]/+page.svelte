<script lang="ts">
  import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import { onMount } from 'svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import Search from '$lib/components/Search.svelte';
  import InvoiceRow from '../../invoices/InvoiceRow.svelte';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import BlankState from '../../invoices/BlankState.svelte';
  import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
  import Button from '$lib/components/Button.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import Edit from '$lib/components/Icon/Edit.svelte';
  import ClientForm from '../ClientForm.svelte';
  import { isLate } from '$lib/utils/dateHelpers';

  export let data: { client: Client };
  console.log({ data });

  let isClientFormShowing: boolean = false;
  let isEditingCurrentClient: boolean = false;

  onMount(() => {
    loadInvoices();
    console.log($invoices);
  });

  const editClient = () => {
    isEditingCurrentClient = true;
    isClientFormShowing = true;
  };

  const closePanel = () => {
    isClientFormShowing = false;
  };

  const getDraft = (): string => {
    if (!data.client.invoice || data.client.invoice.length < 1) return '0.00';
    const draftInvoices = data.client.invoice.filter(
      (invoice) => invoice.invoiceStatus === 'draft'
    );
    return centsToDollars(sumInvoices(draftInvoices));
  };

  const getPaid = (): string => {
    if (!data.client.invoice || data.client.invoice.length < 1) return '0.00';
    const paidInvoices = data.client.invoice.filter((invoice) => invoice.invoiceStatus === 'paid');
    return centsToDollars(sumInvoices(paidInvoices));
  };

  const getTotalOverdue = (): string => {
    if (!data.client.invoice || data.client.invoice.length < 1) return '0.00';
    const paidInvoices = data.client.invoice.filter(
      (invoice) => invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)
    );
    return centsToDollars(sumInvoices(paidInvoices));
  };

  const getTotalOutstanding = (): string => {
    if (!data.client.invoice || data.client.invoice.length < 1) return '0.00';
    const paidInvoices = data.client.invoice.filter(
      (invoice) => invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)
    );
    return centsToDollars(sumInvoices(paidInvoices));
  };
</script>

<svelte:head>
  <title>Invoices | The Dollar Holler</title>
</svelte:head>

<div
  class="md:gap-7-4 mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center lg:mb-16"
>
  <!-- search field -->
  {#if data.client.invoice && data.client.invoice.length > 0}
    <Search />
  {:else}
    <div />
  {/if}

  <!-- new invoice button -->
  <div>
    <Button
      label="+ Client"
      onClick={() => {
        isClientFormShowing = true;
      }}
    />
  </div>
</div>

<div class="mb-7 flex w-full items-center justify-between">
  <h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{data.client.name}</h1>
  <Button label="Edit" isAnimated={false} style="textOnly" iconLeft={Edit} onClick={editClient} />
</div>

<div class="mb-10 grid grid-cols-1 gap-4 rounded-lg bg-gallery py-7 px-10 lg:grid-cols-4">
  <div class="summary-block">
    <div class="label">Total Overdue</div>
    <div class="number"><sup>$</sup>{getTotalOverdue()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Outstanding</div>
    <div class="number"><sup>$</sup>{getTotalOutstanding()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Draft</div>
    <div class="number"><sup>$</sup>{getDraft()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Paid</div>
    <div class="number"><sup>$</sup>{getPaid()}</div>
  </div>
</div>

<!-- list of invoices -->
<div>
  <!-- invoices -->
  {#if data.client.invoice === null || data.client.invoice === undefined}
    Loading...
  {:else if data.client.invoice.length <= 0}
    <BlankState />
  {:else}
    <InvoiceRowHeader className="text-daisyBush" />
    <div class="flex flex-col-reverse">
      {#each data.client.invoice as invoice}
        <InvoiceRow {invoice} />
      {/each}
    </div>
    <CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices(data.client.invoice))}`} />
  {/if}
</div>

<!-- slide panel -->
{#if isClientFormShowing}
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm
      {closePanel}
      formStatus={isEditingCurrentClient ? 'edit' : 'create'}
      client={isEditingCurrentClient ? data.client : undefined}
    />
  </SlidePanel>
{/if}

<style lang="postcss">
  .summary-block {
    @apply text-center;
  }

  .label {
    @apply text-sm font-black text-[#A397AD];
  }

  sup {
    @apply relative -top-2;
  }

  .number {
    @apply truncate text-[2.5rem] font-black text-purple;
  }
</style>
