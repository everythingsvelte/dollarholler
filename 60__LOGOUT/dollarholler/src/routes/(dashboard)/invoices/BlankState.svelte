<script lang="ts">
  import BlankRow from '$lib/components/BlankRow.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';
</script>

<div>
  <div class="-mt-8 md:-mt-6 lg:-mt-14">
    <h2
      class="mb-10 bg-arrowLeftUp bg-left bg-no-repeat pt-14 pl-24 text-left font-handwriting text-2xl font-bold text-caribbeanGreen md:bg-arrowRightUp md:bg-right md:pl-0 md:pr-28 md:text-right md:text-4xl"
    >
      Add Your First Invoice
    </h2>
  </div>
  <!-- invoice header -->
  <InvoiceRowHeader className="text-fog" />

  <!-- blank rows -->
  <BlankRow />
  <BlankRow />
  <BlankRow />
</div>
