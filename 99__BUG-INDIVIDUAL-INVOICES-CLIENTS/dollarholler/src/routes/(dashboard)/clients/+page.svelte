<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Search from '$lib/components/Search.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import ClientRow from './ClientRow.svelte';
  import { clients, loadClients } from '$lib/stores/ClientStore';
  import { onMount } from 'svelte';
  import BlankState from './BlankState.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ClientForm from './ClientForm.svelte';
  import NoSearchResults from '../invoices/NoSearchResults.svelte';

  let isClientFormShowing = false;
  let clientList: Client[] = [];

  const closePanel = () => {
    isClientFormShowing = false;
  };

  const SearchClients = (event: CustomEvent) => {
    const keywords = event.detail.searchTerms;

    clientList = $clients.filter((client) => {
      return (
        client.name?.toLowerCase().includes(keywords.toLowerCase()) ||
        client.email?.toLowerCase().includes(keywords.toLowerCase())
      );
    });
  };

  const ClearSearch = (event: CustomEvent) => {
    if (event.detail.searchTerms === '') {
      clientList = $clients;
    }
  };

  onMount(async () => {
    await loadClients();
    clientList = $clients;
  });
</script>

<svelte:head><title>Clients | The Dollar Holler</title></svelte:head>

<div
  class="md:gap-7-4 mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center lg:mb-16"
>
  <!-- search field -->
  {#if $clients.length > 0}
    <Search on:search={SearchClients} on:clear={ClearSearch} />
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

<!-- clients -->
<div>
  {#if $clients === null}
    Loading...
  {:else if $clients.length <= 0}
    <BlankState />
  {:else if clientList.length <= 0}
    <NoSearchResults />
  {:else}
    <!--  client header row -->
    <ClientRowHeader />

    <!-- client rows -->
    <div class="flex flex-col-reverse">
      {#each clientList as client}
        <ClientRow {client} />
      {/each}
    </div>
  {/if}
</div>

{#if isClientFormShowing}
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm {closePanel} />
  </SlidePanel>
{/if}
