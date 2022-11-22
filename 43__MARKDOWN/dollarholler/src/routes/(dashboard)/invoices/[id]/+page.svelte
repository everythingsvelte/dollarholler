<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { convertDate } from '$lib/utils/dateHelpers';
  import LineItemRows from '../LineItemRows.svelte';
  import { settings, loadSettings } from '$lib/stores/SettingsStore';
  import { onMount } from 'svelte';
  import SvelteMarkdown from 'svelte-markdown';

  export let data: { invoice: Invoice };

  onMount(() => {
    loadSettings();
  });

  const printInvoice = () => {
    console.log('print invoice');
  };

  const copyLink = () => {
    console.log('copy link');
  };

  const sendInvoice = () => {
    console.log('Send Invoice');
  };

  const payInvoice = () => {
    console.log('Pay Invoice');
  };
</script>

<div class="fixed z-0 mb-16 flex w-full max-w-screen-lg justify-between">
  <h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
  <div class="flex items-center gap-4">
    <Button
      height="short"
      label="Print"
      style="outline"
      isAnimated={false}
      onClick={printInvoice}
    />
    <Button height="short" label="Copy Link" onClick={copyLink} />
    <Button height="short" label="Send" onClick={sendInvoice} />
    <Button height="short" label="Pay Invoice" onClick={payInvoice} />
  </div>
</div>

<div
  class="relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-16 px-32 shadow-invoice"
>
  <div class="col-span-3">
    <img
      src="/images/logo.png"
      srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
      alt="Compressed.fm"
    />
  </div>

  <div class="col-span-2 col-start-5 pt-4">
    {#if $settings && $settings.myName}
      <div class="label">From</div>
      <p>
        {$settings.myName}<br />
        {#if $settings.street && $settings.city && $settings.state && $settings.zip}
          {$settings.street}<br />
          {$settings.city}, {$settings.state}
          {$settings.zip}
        {/if}
      </p>
    {:else}
      <div class="center min-h-[68px] rounded bg-gallery">
        <a href="#" class="text-stone-600 underline hover:no-underline"
          >Add your contact information.</a
        >
      </div>
    {/if}
  </div>

  <div class="col-span-3">
    <div class="label">Bill To:</div>
    <p>
      <strong>{data.invoice.client.name}</strong><br />
      {data.invoice.client.email}<br />
      {data.invoice.client.street}<br />
      {data.invoice.client.city}, {data.invoice.client.state}
      {data.invoice.client.zip}
    </p>
  </div>

  <div class="col-span-2 col-start-5">
    <div class="label">Invoice ID</div>
    <p>{data.invoice.invoiceNumber}</p>
  </div>

  <div class="col-span-3">
    <div class="label">Due Date</div>
    <p>{convertDate(data.invoice.dueDate)}</p>
  </div>

  <div class="col-span-2 col-start-5">
    <div class="label">Issue Date</div>
    <p>{convertDate(data.invoice.issueDate)}</p>
  </div>

  <div class="col-span-6">
    <div class="label">Subject</div>
    <p>{data.invoice.subject}</p>
  </div>

  <div class="col-span-6">
    <LineItemRows
      lineItems={data.invoice.lineItems}
      isEditable={false}
      discount={data?.invoice?.discount || 0}
    />
  </div>

  {#if data.invoice.notes}
    <div class="col-span-6">
      <div class="label">Notes</div>
      <SvelteMarkdown source={data.invoice.notes} />
    </div>
  {/if}

  {#if data.invoice.terms}
    <div class="col-span-6">
      <div class="label">Terms and Conditions</div>
      <SvelteMarkdown source={data.invoice.terms} />
    </div>
  {/if}
</div>

<style lang="postcss">
  .label {
    @apply font-black text-monsoon;
  }
</style>
