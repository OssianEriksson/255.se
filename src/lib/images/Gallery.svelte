<script lang="ts" context="module">
  export type GalleryContext =
    | {
        registerImage: (src: Src) => number
        updateImage: (idx: number, src: Src) => void
        open: (idx: number) => void
      }
    | undefined
</script>

<script lang="ts">
  import type { Src } from '.'
  import { setContext, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Image, GalleryGrid, galleryKey } from '.'

  let sources: Src[] = []

  export let index: number | undefined = undefined
  export let noGrid = false

  setContext(galleryKey, {
    registerImage: (src) => {
      sources.push(src)
      return sources.length - 1
    },
    updateImage: (idx, src) => (sources[idx] = src),
    open: select,
  } satisfies GalleryContext)

  const dispatch = createEventDispatcher<{ select: number | undefined }>()

  function select(idx: number | undefined) {
    index = idx
    dispatch('select', idx)
  }

  const transDuration = Number(tailwindcss.config.theme.transitionDuration?.DEFAULT?.slice(0, -2)) || 0
</script>

{#if noGrid}
  <slot />
{:else}
  <GalleryGrid>
    <slot />
  </GalleryGrid>
{/if}
{#if typeof index !== 'undefined' && index >= 0 && index < sources.length}
  <div transition:fade={{ duration: transDuration }} class="fixed h-full w-full bg-white top-0 left-0">
    <Image
      class="max-w-full max-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      src={sources[index]}
      sizes="100vw"
      gallery={false}
    />
    <button
      class="text-white bg-black absolute right-0 top-0 p-2 m-4 text-3xl aspect-square flex justify-center items-center rounded-full bg-opacity-30 hover:bg-opacity-80 text-opacity-60 hover:text-opacity-100 transition-colors"
      on:click={() => select(undefined)}
    >
      ✕
    </button>
    <button
      disabled={index <= 0}
      class="text-white bg-black absolute left-0 top-1/2 -translate-y-1/2 py-2 px-4 ml-4 text-5xl flex justify-center items-center rounded-lg bg-opacity-30 hover:bg-opacity-80 text-opacity-60 hover:text-opacity-100 disabled:opacity-0 transition-[colors,opacity]"
      on:click={() => select(typeof index === 'undefined' ? undefined : index - 1)}
    >
      ⟨
    </button>
    <button
      disabled={index >= sources.length - 1}
      class="text-white bg-black absolute right-0 top-1/2 -translate-y-1/2 py-2 px-4 mr-4 text-5xl flex justify-center items-center rounded-lg bg-opacity-30 hover:bg-opacity-80 text-opacity-60 hover:text-opacity-100 disabled:opacity-0 transition-[colors,opacity]"
      on:click={() => select(typeof index === 'undefined' ? undefined : index + 1)}
    >
      ⟩
    </button>
  </div>
{/if}
