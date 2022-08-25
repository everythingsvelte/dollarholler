<script lang="ts">
  import Search from '$lib/components/Icon/Search.svelte';
</script>

<div class="relative flex w-full items-baseline">
  <div class="mr-2 mt-auto text-pastelPurple"><Search /></div>
  <input
    class="border-b-2 w-72 border-dashed border-pastelPurple bg-transparent font-sansSerif text-xl text-black outline-none"
    type="text"
    name="search"
    placeholder="Search by Keyword"
  />
  <button class="font-sansSerif text-xl font-black text-pastelPurple">Search</button>
</div>
