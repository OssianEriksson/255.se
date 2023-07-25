<script lang="ts">
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { Gallery } from '$lib/images'
  import { buildUrl } from '$lib/route'
</script>

<Gallery
  index={parseInt($page.params.index)}
  on:select={(e) =>
    goto(buildUrl($page.route?.id ?? '', { ...$page.params, index: e.detail ?? undefined }), {
      replaceState: typeof $page.params.index !== 'undefined',
      noScroll: true,
    })}
  noGrid
>
  <slot />
</Gallery>
