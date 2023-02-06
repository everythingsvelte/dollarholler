import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, runFunction) => {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as HTMLElement)) {
      if (runFunction) runFunction();
    }
  }

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    }
  }
}