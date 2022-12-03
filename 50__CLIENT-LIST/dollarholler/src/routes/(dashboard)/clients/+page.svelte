<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Search from '$lib/components/Search.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import ClientRow from './ClientRow.svelte';
  import { clients, loadClients } from '$lib/stores/ClientStore';
  import { onMount } from 'svelte';

  onMount(() => {
    loadClients();
  });
</script>

<svelte:head><title>Clients | The Dollar Holler</title></svelte:head>

<div
  class="md:gap-7-4 mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center lg:mb-16"
>
  <!-- search field -->
  <!-- {#if $invoices.length > 0} -->
  <Search />
  <!-- {:else}
    <div />
  {/if} -->

  <!-- new invoice button -->
  <div>
    <Button
      label="+ Client"
      onClick={() => {
        // isInvoiceFormShowing = true;
      }}
    />
  </div>
</div>

<!-- clients -->
<div>
  {#if $clients === null}
    Loading...
  {:else if $clients.length <= 0}
    Blank State
  {:else}
    <!--  client header row -->
    <ClientRowHeader />

    <!-- client rows -->
    <div class="flex flex-col-reverse">
      {#each $clients as client}
        <ClientRow {client} />
      {/each}
    </div>
  {/if}
</div>
