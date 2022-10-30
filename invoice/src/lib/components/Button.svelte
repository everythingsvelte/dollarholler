<script lang="ts">
  export let label: string;
  export let onClick: () => void;
  export let style: 'primary' | 'secondary' | 'destructive' = 'primary';

  export let isAnimated = true;
</script>

<button
  on:click|preventDefault={() => onClick()}
  class="relative  whitespace-nowrap rounded-lg  px-5 py-2 font-sansSerif text-base font-black lg:px-10 lg:py-3 lg:text-xl"
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:destructive={style === 'destructive'}
  class:isAnimated>{label}</button
>

<style lang="postcss">
  .isAnimated {
    @apply translate-y-0 shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover;
  }

  .primary {
    @apply bg-lavenderIndigo text-white;
  }
  .secondary {
    @apply bg-gallery text-daisyBush;
  }
  .destructive {
    @apply bg-scarlet text-goldenFizz;
  }
</style>
