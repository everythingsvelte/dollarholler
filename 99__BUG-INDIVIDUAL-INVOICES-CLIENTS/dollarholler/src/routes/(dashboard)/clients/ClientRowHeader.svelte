<script lang="ts">
  export let className: string = '';
</script>

<div class={`client-table hidden lg:grid ${className}`}>
  <h3>Status</h3>
  <h3>Client</h3>
  <h3 class="text-right">Received</h3>
  <h3 class="text-right">Balance</h3>
  <div />
  <div />
</div>

<style lang="postcss">
  h3 {
    @apply text-xl font-black leading-snug text-daisyBush;
  }
</style>
