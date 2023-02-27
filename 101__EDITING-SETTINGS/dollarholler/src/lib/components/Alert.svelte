<script lang="ts">
  export let message: string = '';
  export let className = '';
</script>

{#if message}
  <div
    class={`mb-8 h-14 rounded-md p-4 text-center text-base ${className}`}
    class:bg-lavenderIndigo={!className}
    class:text-white={!className}
  >
    <p>{message}</p>
  </div>
{/if}
