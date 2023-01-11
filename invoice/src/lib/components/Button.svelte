<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  export let label: string;
  export let onClick: () => void;
  export let style:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'textOnly'
    | 'textOnlyDestructive' = 'primary';
  export let height: 'short' | 'regular' = 'regular';
  export let iconLeft: (new (...args: any[]) => SvelteComponent) | null = null;
  export let iconRight: (new (...args: any[]) => SvelteComponent) | null = null;

  export let isAnimated = true;
</script>

<button
  on:click|preventDefault={() => onClick()}
  class="button"
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:destructive={style === 'destructive'}
  class:outline={style === 'outline'}
  class:textOnly={style === 'textOnly'}
  class:textOnlyDestructive={style === 'textOnlyDestructive'}
  class:short={height === 'short'}
  class:isAnimated
>
  {#if iconLeft}
    <div class="mr-2">
      <svelte:component this={iconLeft} />
    </div>
  {/if}
  {label}
  {#if iconRight}
    <div class="mr-2">
      <svelte:component this={iconRight} />
    </div>
  {/if}
</button>

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
  .textOnly {
    @apply bg-transparent px-0 text-lavenderIndigo underline hover:no-underline;
  }
  .textOnlyDestructive {
    @apply bg-transparent px-0 text-scarlet no-underline hover:underline;
  }
  .outline {
    @apply border-daisyBush text-daisyBush hover:bg-daisyBush hover:text-white;
  }

  .short {
    @apply !py-1;
  }
</style>
