<script lang="ts">
  export let label: string;
  export let amount: string;
</script>

<div class="center float-right flex min-h-[6rem] min-w-[16rem] gap-x-4 bg-circle bg-no-repeat">
  <div class="font-bold">{label}</div>
  <div class="font-mono text-xl font-bold">{amount}</div>
</div>
