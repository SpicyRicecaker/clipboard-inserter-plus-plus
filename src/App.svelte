<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  let main: HTMLElement;
  // Copied items is the contents that we'll be displaying
  let copiedItems: string[] = [];
  // Buffer records last clipboard item
  let buffer: string = '';

  // Read cycle every 300ms.
  const read = async () => {
    // Always check to make sure we can read clipboard
    // Read clipboard and store in buffer
    try {
      buffer = await navigator.clipboard.readText();
      // If our last item is not identical,
      if (copiedItems[copiedItems.length - 1] != buffer) {
        // Update the buffer
        copiedItems.push(buffer);
        copiedItems = copiedItems;
        // Then await DOM update
        await tick();
        // Then scroll to bottom of page!
        main.scrollTo({
          top: main.scrollHeight,
          behavior: 'smooth',
        });
      }
    } catch (e) {}
    // Repeat
    setTimeout(read, 300);
  };

  onMount(async () => {
    read();
  });
</script>

<main bind:this={main}>
  <!-- Make sure clipboard hooks into `main`, as stated here! -->
  <p>Clipboard Inserter</p>
  {#each copiedItems as copiedItem}
    <p>{copiedItem}</p>
  {/each}
</main>

<style lang="scss">
  :global(body) {
    margin: 0;
    padding: 0;
  }
  main {
    // Required
    height: 100%;
    width: 100%;

    // Theme
    background-color: hsl(226, 23%, 11%);
    color: #bcbdd0;

    // CSS scroll snap!
    scroll-snap-type: y proximity;
    overflow-y: auto;

    // Display grid so we can get gap
    display: flex;
    flex-direction: column;
    gap: .5rem;

    // Every `p` inside main
    & > p {
      flex: 0;
      // Required
      margin: 0;
      padding: 1rem;
      // height: 20vh;

      // Theme
      background-color: #282d3f;
      color: #bcbdd0;

      // Scroll snap at end, may change later
      scroll-snap-align: end;

      // Center text, you know the drill
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
