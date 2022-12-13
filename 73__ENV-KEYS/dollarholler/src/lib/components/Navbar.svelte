<script lang="ts">
  import { page } from '$app/stores';
  import Close from '$lib/components/Icon/Close.svelte';
  import Hamburger from '$lib/components/Icon/Hamburger.svelte';

  let isNavShowing = false;
</script>

<svelte:head>
  {#if isNavShowing}
    <style lang="postcss">
      body {
        @apply overflow-hidden md:overflow-auto;
      }
    </style>
  {/if}
</svelte:head>

<!-- mobile nav control -->
<button
  class="fixed right-6 top-6 z-navBarToggle md:hidden"
  class:text-goldenFizz={isNavShowing}
  class:text-daisyBusy={!isNavShowing}
  on:click={() => {
    isNavShowing = !isNavShowing;
  }}
>
  {#if isNavShowing}
    <Close width={32} height={32} />
  {:else}
    <Hamburger width={32} height={32} />
  {/if}
</button>

<header
  class="fixed z-navBar h-screen w-full -translate-x-full bg-daisyBush text-center transition-transform md:relative md:col-span-3 md:h-full md:translate-x-0"
  class:translate-x-0={isNavShowing}
>
  <div class="mt-10 mb-10 md:mb-24">
    <a href="/invoices"><img src="/images/logo.svg" alt="The Dollar Holler" class="mx-auto" /></a>
  </div>

  <nav>
    <ul class="list-none text-2xl font-bold">
      <li><a href="/invoices" class:active={$page.url.pathname === '/invoices'}>Invoices</a></li>
      <li><a href="/clients" class:active={$page.url.pathname === '/clients'}>Clients</a></li>
      <li><a href="/settings" class:active={$page.url.pathname === '/settings'}>Settings</a></li>
      <li><a href="#">Logout</a></li>
    </ul>
  </nav>
</header>

<style lang="postcss">
  nav ul li {
    @apply mb-6;
  }

  nav ul li a {
    @apply font-bold text-white hover:text-goldenFizz;
  }

  nav ul li a.active {
    @apply px-8 text-robinEggBlue transition-[padding];
    background: url('/images/active-nav--left.svg') left top no-repeat,
      url('/images/active-nav--right.svg') right top no-repeat;
  }

  nav ul li a.active:hover {
    @apply px-9;
  }
</style>
