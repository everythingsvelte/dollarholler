<script lang="ts">
  export let message: string = '';
</script>

{#if message}
  <div class="mb-8 min-h-[56px] rounded-md bg-lavenderIndigo p-4 text-center text-base text-white">
    <p>{message}</p>
  </div>
{/if}
