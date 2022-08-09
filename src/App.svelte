<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Mode } from "./lib";
  import { options } from "./store";
  import Options from "./Options.svelte";

  // let main: HTMLElement;
  let items: HTMLElement;

  interface Item {
    date: Date;
    contents: string;
  }

  // Copied items is the contents that we'll be displaying
  let copiedItems: Item[] = [];
  // Buffer records last clipboard item
  let buffer: string = "";

  const reverseList = async (mode: Mode) => {
    copiedItems.reverse();
    copiedItems = copiedItems;

    await tick();
    items.scrollTo({
      top: mode === Mode.AddToBottom ? items.scrollHeight : 0,
      behavior: "smooth",
    });
  };

  $: {
    // whenever we change the current mode, we just want to reverse the state of the array
    reverseList($options.currentMode);
  }

  // Read cycle every 300ms.
  const read = async () => {
    // Always check to make sure we can read clipboard
    // Read clipboard and store in buffer
    try {
      // If our last item is not identical,
      if (buffer !== (await navigator.clipboard.readText())) {
        // Update the buffer, according to insert mode
        buffer = await navigator.clipboard.readText();
        if ($options.currentMode === Mode.AddToBottom) {
          copiedItems.push({ date: new Date(), contents: buffer });
        } else {
          copiedItems = [
            { date: new Date(), contents: buffer },
            ...copiedItems,
          ];
        }
        copiedItems = copiedItems;

        await tick();
        // Then scroll to bottom of page!
        items.scrollTo({
          top:
            $options.currentMode === Mode.AddToBottom ? items.scrollHeight : 0,
          behavior: "smooth",
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

<main>
  {#if $options.currentMode === Mode.AddToBottom}
    <Options />
  {/if}
  <!-- Make sure clipboard hooks into `main`, as stated here! -->
  <div class="items" bind:this="{items}">
    {#each copiedItems as copiedItem (copiedItem.date)}
      <p
        style="scroll-snap-align: {$options.currentMode === Mode.AddToTop
          ? 'start'
          : 'end'}"
      >
        {copiedItem.contents}
      </p>
    {/each}
  </div>
  {#if $options.currentMode === Mode.AddToTop}
    <Options />
  {/if}
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

    & > .items {
      // Display grid so we can get gap
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      // // CSS scroll snap!
      scroll-snap-type: y proximity;
      // // scroll-snap-align: end;
      overflow-y: auto;

      // Every `p` inside items
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
        // scroll-snap-align: end;

        // Center text, you know the drill
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    // Display grid so we can get gap
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
