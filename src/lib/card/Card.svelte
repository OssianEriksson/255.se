<script lang="ts">
  import type { Src } from '$lib/image/Image.svelte'
  import Image from '$lib/image/Image.svelte'

  export let thumbnail: Src | undefined
  export let href: string | undefined

  let clientWidth: number
  let isHovering: boolean = false
</script>

<a
  {href}
  class="no-style flex flex-row mb-4 bg-white break-inside-avoid rounded items-stretch transition-transform"
  bind:clientWidth
  on:focus={() => (isHovering = true)}
  on:blur={() => (isHovering = false)}
  on:mouseover={() => (isHovering = true)}
  on:mouseout={() => (isHovering = false)}
  role="button"
  tabindex="-1"
  {...isHovering ? { style: `transform: scale(${(clientWidth + 4) / clientWidth})` } : {}}
>
  {#if thumbnail}
    <div class="rounded-l relative bg-black flex-grow max-w-[16rem] overflow-clip">
      <div class="bg-red-100 w-full h-full absolute">
        <Image class="min-h-full" src={thumbnail} sizes="min(16rem)" />
      </div>
    </div>
  {/if}
  <div class="min-w-[70%] flex-1 pl-4 pr-4">
    <slot />
  </div>
</a>
