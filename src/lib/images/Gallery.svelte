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
  import { setContext, createEventDispatcher, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Image, GalleryGrid, galleryKey } from '.'
  import MdClose from 'svelte-icons/md/MdClose.svelte'
  import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte'
  import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte'

  export let index: number | undefined = undefined
  export let noGrid = false

  let sources: Src[] = []

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
    pushBackUIFadeOut()
    dispatch('select', idx)
  }

  let uiVisible = true
  let uiFade = false

  let uiFadeOutTimer: ReturnType<typeof setTimeout> | null = null

  function clearUIFadeOutTimer() {
    if (uiFadeOutTimer) {
      clearTimeout(uiFadeOutTimer)
      uiFadeOutTimer = null
    }
  }

  function pushBackUIFadeOut() {
    uiVisible = true
    uiFade = false
    clearUIFadeOutTimer()
    uiFadeOutTimer = setTimeout(() => {
      uiVisible = false
      uiFade = true
    }, 3000)
  }

  function toggleUIVisible() {
    uiVisible = !uiVisible
    uiFade = false
    if (uiVisible) {
      pushBackUIFadeOut()
    } else {
      clearUIFadeOutTimer()
    }
  }

  let lastMouseMoveTime = 0
  function onMouseMove() {
    const currentTime = Date.now()
    if (currentTime - lastMouseMoveTime < 200) {
      pushBackUIFadeOut()
    }
    lastMouseMoveTime = currentTime
  }

  onMount(pushBackUIFadeOut)

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
  <div
    transition:fade={{ duration: transDuration }}
    class="fixed h-full w-full bg-white top-0 left-0"
    on:click={toggleUIVisible}
    on:keypress={toggleUIVisible}
    on:mousemove={onMouseMove}
  >
    <Image
      class="max-w-full max-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      src={sources[index]}
      sizes="100vw"
      gallery={false}
    />
    <button
      class={`text-white bg-black absolute right-0 top-0 m-4 p-2 w-16 h-16 flex justify-center items-center rounded-full bg-opacity-30 hover:bg-opacity-80 text-opacity-60 hover:text-opacity-100 ${
        uiVisible ? 'opacity-100' : 'opacity-0'
      } duration-150 ease-in-out`}
      style={`transition: color 0.15s, background-color 0.15s, opacity ${uiFade ? '2s' : '0.15s'}`}
      on:click|stopPropagation={() => select(undefined)}
    >
      <MdClose />
    </button>
    <button
      disabled={index <= 0}
      class={`text-white bg-black absolute left-0 top-1/2 -translate-y-1/2 w-16 h-24 ml-4 flex justify-center items-center rounded-lg bg-opacity-30 hover:bg-opacity-80 text-opacity-60 hover:text-opacity-100 disabled:opacity-0 ${
        uiVisible ? 'opacity-100' : 'opacity-0'
      } duration-150 ease-in-out`}
      style={`transition: color 0.15s, background-color 0.15s, opacity ${uiFade ? '2s' : '0.15s'}`}
      on:click|stopPropagation={() => select(typeof index === 'undefined' ? undefined : index - 1)}
    >
      <MdChevronLeft />
    </button>
    <button
      disabled={index >= sources.length - 1}
      class={`text-white bg-black absolute right-0 top-1/2 -translate-y-1/2 w-16 h-24 mr-4 flex justify-center items-center rounded-lg bg-opacity-30 hover:bg-opacity-80 text-opacity-60 hover:text-opacity-100 disabled:opacity-0 ${
        uiVisible ? 'opacity-100' : 'opacity-0'
      } duration-150 ease-in-out`}
      style={`transition: color 0.15s, background-color 0.15s, opacity ${uiFade ? '2s' : '0.15s'}`}
      on:click|stopPropagation={() => select(typeof index === 'undefined' ? undefined : index + 1)}
    >
      <MdChevronRight />
    </button>
  </div>
{/if}
