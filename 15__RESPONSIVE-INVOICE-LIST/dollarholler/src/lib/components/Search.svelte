<script lang="ts">
  import Search from '$lib/components/Icon/Search.svelte';
</script>

<div class="relative flex w-full items-baseline">
  <div class="mr-2 mt-auto text-pastelPurple"><Search /></div>
  <input
    class="w-full border-b-2 border-dashed border-pastelPurple bg-transparent font-sansSerif text-base text-black outline-none md:w-[14rem] lg:w-72 lg:text-xl"
    type="text"
    name="search"
    placeholder="Search by Keyword"
  />
  <button class="font-sansSerif font-black text-pastelPurple md:text-lg lg:text-xl">Search</button>
</div>
