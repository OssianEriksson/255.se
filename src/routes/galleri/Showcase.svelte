<script lang="ts">
  import type { Src } from '$lib/image/Image.svelte'
  import Image from '$lib/image/Image.svelte'

  export let thumbnail: Src
  export let href: string
</script>

<a
  {href}
  class="flex flex-col sm:flex-row shadow-lg p-6 rounded hover:scale-105 hover:lg:scale-[1.02] transition-transform mt-6 mb-6 !no-underline"
>
  <div class="flex-shrink-0 sm:w-1/3 max-w-[16rem]">
    <Image class="w-full rounded" src={thumbnail} sizes="min(33vw,16rem)" />
  </div>
  <div class="ml-4">
    <slot />
  </div>
</a>
