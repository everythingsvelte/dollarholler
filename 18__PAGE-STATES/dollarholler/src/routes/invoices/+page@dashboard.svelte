<script lang="ts">
  import { onMount } from 'svelte';
  import { invoices, loadInvoices } from '$lib/stores/invoiceStore';
  import Search from '$lib/components/Search.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import { sumInvoices, centsToDollars } from '$lib/utils/moneyHelpers';

  onMount(() => {
    loadInvoices();
    console.log($invoices);
  });
</script>

<svelte:head>
  <title>Invoices | The Dollar Holler</title>
</svelte:head>

<div
  class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center lg:mb-16"
>
  <!-- search input -->
  <Search />

  <!-- new invoice button -->
  <div>
    <button
      class="relative translate-y-0 whitespace-nowrap rounded-lg bg-lavenderIndigo px-5 py-2 font-sansSerif text-base font-black text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover lg:px-10 lg:py-3 lg:text-xl"
      >+ Invoice</button
    >
  </div>
</div>

<!-- list of invoices -->
<div>
  <!-- header -->
  <div class="table-header mb-3 hidden grid-cols-invoiceTable gap-4 px-6 text-daisyBush lg:grid">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID</h3>
    <h3>Client</h3>
    <h3 class="text-right">Amount</h3>
    <div />
    <div />
  </div>

  <!-- list of invoices -->
  <div class="flex flex-col-reverse">
    {#each $invoices as invoice}
      <InvoiceRow {invoice} />
    {/each}
  </div>

  <CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices($invoices))}`} />
</div>

<style lang="postcss">
  .table-header h3 {
    @apply font-sansSerif text-xl font-black leading-snug;
  }
</style>
