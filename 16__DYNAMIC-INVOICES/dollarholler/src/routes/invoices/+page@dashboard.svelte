<script lang="ts">
  import Search from '$lib/components/Search.svelte';
  import View from '$lib/components/Icon/View.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
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
    <h3>Amount</h3>
    <div />
    <div />
  </div>

  <!-- list of invoices -->
  <div
    class="invoice-row mb-3 grid w-full grid-cols-invoiceTableMobile items-center gap-x-4 rounded-lg bg-white px-4 py-3 shadow-tableRow lg:grid-cols-invoiceTable lg:px-6 lg:py-6"
  >
    <div class="status"><Tag className="ml-auto lg:ml-0" label="draft" /></div>
    <div class="dueDate text-sm lg:text-lg">8/1/2022</div>
    <div class="invoiceNumber text-sm lg:text-lg">12345</div>
    <div class="clientName text-base font-bold lg:text-lg">Compressed.fm</div>
    <div class="amount text-right font-mono text-sm font-bold lg:text-lg">$504.00</div>
    <div class="viewButton hidden lg:block">
      <a href="#" class="text-pastelPurple hover:text-daisyBush"><View /></a>
    </div>
    <div class="moreButton hidden lg:block">
      <button class="center text-pastelPurple hover:text-daisyBush"><ThreeDots /></button>
    </div>
  </div>

  <CircledAmount label="Total" amount="$1,144.00" />
</div>

<style lang="postcss">
  .table-header h3 {
    @apply font-sansSerif text-xl font-black leading-snug;
  }

  .invoice-row {
    grid-template-areas:
      'invoiceNumber invoiceNumber'
      'clientName amount'
      'dueDate status';
  }

  @media (min-width: 1024px) {
    .invoice-row {
      grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
    }
  }

  .invoice-row .status {
    grid-area: status;
  }

  .invoice-row .dueDate {
    grid-area: dueDate;
  }

  .invoice-row .invoiceNumber {
    grid-area: invoiceNumber;
  }

  .invoice-row .clientName {
    grid-area: clientName;
  }

  .invoice-row .amount {
    grid-area: amount;
  }

  .invoice-row .viewButton {
    grid-area: viewButton;
  }

  .invoice-row .moreButton {
    grid-area: moreButton;
  }
</style>
