import type { Action } from 'svelte/action';
import { spring } from "svelte/motion";

interface SwipeProps {
  triggerReset?: boolean;
}

export const swipe: Action<HTMLElement, SwipeProps> = (node, params) => {
  let x: number;
  let startingX: number;
  const elementWidth = node.clientWidth;
  let triggerReset = params?.triggerReset || false;

  const coordinates = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.2,
      damping: 0.4,
    }
  )

  coordinates.subscribe(($coords) => {
    node.style.transform = `translate3d(${$coords.x}px, 0, 0)`
  })

  node.addEventListener('mousedown', handleMouseDown);

  function resetCard() {
    coordinates.update(() => {
      return { x: 0, y: 0 }
    })
    triggerReset = false;
  }

  function outOfView() {
    node.dispatchEvent(
      new CustomEvent('outOfView')
    )
  }

  function handleMouseDown(event: MouseEvent) {
    x = event.clientX;
    startingX = event.clientX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    // Delta x = difference from where we clicked vs where we are currently.
    const dx = event.clientX - x;
    x = event.clientX;
    coordinates.update(($coords) => {
      return {
        x: $coords.x + dx,
        y: 0
      }
    });
  }

  function updateCoordinates(x) {
    coordinates.update(() => {
      return { x, y: 0 }
    });
  }

  function moveCardOver(endingX: number) {
    const leftSnapX = elementWidth * -.95
    const rightSnapX = 0;
    const movement = startingX - endingX;

    // swiped left
    if (movement > 20) {
      x = leftSnapX;
      outOfView();
    } // swiped right
    else {
      x = rightSnapX;
    }
    updateCoordinates(x);
  }

  function handleMouseUp(event: MouseEvent) {
    const endingX = event.clientX;
    moveCardOver(endingX);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  return {
    update(newParams: SwipePops) {
      if (newParams.triggerReset) {
        resetCard();
      }
    },
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
    }
  }
}