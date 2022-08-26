<script lang="ts">
  export let label: 'draft' | 'sent' | 'current' | 'late' | 'paid' = 'draft';
  export let className = '';
</script>

<div
  class={`text-md w-20 rounded-full border-1 border-pastelPurple text-center font-sansSerif font-bold capitalize text-pastelPurple ${className}`}
  class:outline={label === 'draft'}
  class:success={label === 'sent' || label === 'current'}
  class:alert={label === 'late'}
  class:archive={label === 'paid'}
>
  {label}
</div>

<style lang="postcss">
  .outline {
    @apply border-pastelPurple text-pastelPurple;
  }

  .success {
    @apply border-robinEggBlue bg-robinEggBlue text-blueGem;
  }

  .alert {
    @apply border-scarlet bg-scarlet text-goldenFizz;
  }

  .archive {
    @apply border-pastelPurple bg-pastelPurple text-white;
  }
</style>
