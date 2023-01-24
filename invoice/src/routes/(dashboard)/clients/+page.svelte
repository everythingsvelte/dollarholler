<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Search from '$lib/components/Search.svelte';
  import ClientRow from './ClientRow.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import { clients, loadClients } from '$lib/stores/ClientStore';
  import { onMount } from 'svelte';
  import { states } from '$lib/utils/states';
  import BlankState from './BlankState.svelte';

  onMount(() => {
    loadClients();
  });
</script>

<svelte:head>
  <title>Clients | AgencyGA</title>
</svelte:head>

<div
  class="md:gap-7-4 mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center lg:mb-16"
>
  <!-- search field -->

  {#if $clients.length > 0}
    <Search />
  {:else}
    <div />
  {/if}

  <!-- new invoice button -->
  <div>
    <Button
      label="+Clients"
      onClick={() => {
        /* isInvoiceFormShowing = true; */
      }}
    />
  </div>
</div>

<!-- clients -->

<div>
  {#if $clients === null}
    Loading...
  {:else if $clients.length === 0}
    <BlankState />
  {:else}
    <!-- client header row -->
    <ClientRowHeader />

    <!-- client rows -->
    <div class="flex flex-col-reverse">
      {#each $clients as client}
        <ClientRow {client} />
      {/each}
    </div>
  {/if}
</div>
