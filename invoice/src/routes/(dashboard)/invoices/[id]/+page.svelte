<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  const printInvoice = () => {
    console.log('print invoice');
  };

  const copyLink = () => {
    console.log('copy link');
  };
  const payInvoice = () => {
    console.log('pay invoice');
  };
  const sendInvoice = () => {
    console.log('send invoice');
  };
</script>

<div class="fixed z-0 mb-16 flex w-full max-w-screen-lg justify-between">
  <h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
  <div class="flex items-center gap-4">
    <!-- svelte-ignore missing-declaration -->
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
      src="/images/logoGA.png"
      srcset="/images/logoGA@2x.png 2x, /images/logoGA.png 1x"
      alt="Agency GA Logo"
    />
  </div>
  <div class="col-span-2 col-start-5 pt-4">
    <div class="label">From</div>
    <p>
      Alessandro Giuzio <br />
      Zarautz 132 <br />
      20018, San Sebastian
    </p>
  </div>
  <div class="col-span-3">
    <div class="label">Bill To:</div>
    <p>
      <strong>AgencyGA</strong><br />
      info@agencyga.com <br />
      1234 Main Street <br />
      San Francisco, CA 94111
    </p>
  </div>

  <div class="col-span-2 col-start-5">
    <div class="label">Invoice ID</div>
    <p>12348</p>
  </div>

  <div class="col-span-3">
    <div class="label">Due Date</div>
    <p>22/02/2023</p>
  </div>

  <div class="col-span-2 col-start-5">
    <div class="label">Issue Date</div>
    <p>01/02/2023</p>
  </div>

  <div class="col-span-6">
    <div class="label">Subject</div>
    <p>Website</p>
  </div>

  <div class="col-span-6">
    <!-- line items -->
  </div>

  <div class="col-span-6">
    <div class="label">Notes</div>
    <p>Lorem Ipsum</p>
  </div>
  <div class="col-span-6">
    <div class="label">Terms and Conditions</div>
    <p>Lorem Ipsum</p>
  </div>
</div>

<style lang="postcss">
  .label {
    @apply font-black text-monsoon;
  }
</style>
