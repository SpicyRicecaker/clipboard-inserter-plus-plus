<script type="ts">
  import { options } from "./store";

  let optionsVisible = false;
  import Icon from "@iconify/svelte/dist/OfflineIcon.svelte";
  import cog from "@iconify-icons/mdi/cog";
</script>

<div class="title">
  <div
    on:click="{() => {
      optionsVisible = !optionsVisible;
    }}"
    class="gear"
  >
    <Icon icon="{cog}" inline="{true}" />
  </div>

  Clipboard Inserter
</div>
{#if optionsVisible}
  <div class="options">
    <div>
      Sort By: {#each $options.modes as option}
        <label>
          <input
            type="radio"
            bind:group="{$options.currentMode}"
            name="flavours"
            value="{option.mode}"
          />
          {option.label}
        </label>
      {/each}
    </div>
    <!-- <div>
        <label>
          <input type="checkbox" bind:checked="{$options.showDate}" />
          Show Date
        </label>
      </div> -->
  </div>
{/if}

<style type="scss">
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .gear {
    // position: absolute;
    // top: 1rem;
    // left: 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  .options {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #282d3f;
    & > div {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }
</style>
