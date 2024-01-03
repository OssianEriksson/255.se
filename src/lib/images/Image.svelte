<script lang="ts" context="module">
  export type Src = import('&as=Image').Source | `${string}.svg`
</script>

<script lang="ts">
  import type { GalleryContext } from '.'
  import viewport from '$lib/viewport'
  import { galleryKey } from '.'
  import { getContext, onMount } from 'svelte'

  export let src: Src
  export let alt: string | undefined = undefined
  export let delayed = false
  export let gallery = true

  const galleryContext = gallery ? getContext<GalleryContext>(galleryKey) : undefined

  export let sizes: string = galleryContext ? 'min(100vw, 16rem)' : '100vw'

  let clazz = ''
  export { clazz as class }

  let galleryIndex: number
  if (galleryContext) {
    galleryIndex = galleryContext.registerImage(src)
  }

  onMount(() => {
    if (galleryContext) {
      galleryContext.updateImage(galleryIndex, src)
    }
  })

  $: if (galleryContext) {
    galleryContext.updateImage(galleryIndex, src)
  }

  let source: import('&as=Image').Source
  $: source =
    typeof src === 'string'
      ? {
          alt: src,
          placeholder: src,
          sources: [],
        }
      : src

  let img: HTMLImageElement
  let loaded = false
  let startLoad = !delayed

  function onEnterViewport() {
    startLoad = true
  }

  function onClick() {
    if (galleryContext) {
      galleryContext.open(galleryIndex)
    }
  }

  function isOutdatedImage() {
    return !!img.currentSrc && !source.sources.some((src) => src.srcset.includes(img.currentSrc))
  }

  $: {
    loaded = false
    if (source.sources.length === 0) {
      loaded = true
    } else {
      if (img) {
        if (isOutdatedImage()) {
          img.addEventListener('load', () => (loaded = true), { once: true })
          if (!isOutdatedImage() && img.complete) {
            loaded = true
          }
        } else {
          if (img.complete) {
            loaded = true
          } else {
            img.addEventListener('load', () => (loaded = true), { once: true })
            if (img.complete) {
              loaded = true
            }
          }
        }
      }
    }
  }
</script>

<div
  class={`${clazz}${galleryContext ? ' hover:scale-105 transition-transform cursor-pointer rounded my-4' : ''}`}
  style={'position: relative' + (source.aspect ? `; aspect-ratio: ${source.aspect}` : '')}
  use:viewport={{ rootMargin: '512px' }}
  on:enterViewport|once={onEnterViewport}
  on:click={onClick}
  on:keypress={onClick}
  role="button"
  tabindex="-1"
>
  {#if startLoad}
    <picture class="absolute top-0 left-0 w-full h-full">
      {#each source.sources as imgSrc}
        <source {...imgSrc} {sizes} />
      {/each}
      <img
        class="w-full h-full object-cover"
        bind:this={img}
        srcset=""
        src={loaded ? source.placeholder : ''}
        alt={alt || source.alt}
        loading="lazy"
      />
    </picture>
  {/if}
  <div
    class="overflow-hidden relative w-full h-full bg-gray-100 pointer-events-none {loaded
      ? 'duration-300 transition-opacity opacity-0'
      : 'opacity-100'}"
  >
    <img class="w-full h-full object-cover blur-lg" src={source.placeholder} alt={alt || source.alt} />
  </div>
</div>
