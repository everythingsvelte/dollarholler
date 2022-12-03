<script lang="ts">
  import Search from '$lib/components/Icon/Search.svelte';
</script>

<div class="relative flex w-full items-baseline">
  <div class="mr-2 mt-auto text-pastelPurple"><Search /></div>
  <input
    type="text"
    name="search"
    placeholder="Search by keyword"
    class="search w-full border-b-2 border-dashed border-b-pastelPurple bg-transparent pr-[80px] font-sansSerif text-base text-black outline-none focus:border-solid focus:border-b-lavenderIndigo md:w-[14rem] md:pr-0 lg:w-72 lg:text-xl"
  />
  <button
    class="pointer-events-none absolute left-8 transform font-sansSerif text-lg font-black text-pastelPurple transition-transform lg:text-xl"
    >Search</button
  >
</div>

<style lang="postcss">
  ::placeholder {
    color: transparent;
  }
  input:not(:placeholder-shown) + button,
  input:focus + button {
    @apply pointer-events-auto left-auto right-0 translate-x-[calc(100%-65px)] text-right text-lavenderIndigo md:right-auto md:left-0 md:translate-x-[16rem] lg:translate-x-80;
  }

  input + button:focus,
  input:focus + button:hover {
    @apply text-daisyBush;
  }
</style>
