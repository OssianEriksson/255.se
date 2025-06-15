<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  import { onMount } from 'svelte'

  import type { Obfuscated } from '.'
  import { deobfuscate } from '.'

  export let href: Obfuscated

  type $$Props = Omit<HTMLAnchorAttributes, 'href'> & {
    href: Obfuscated
  }

  let plaintext = ''
  onMount(() => (plaintext = deobfuscate(href)))
</script>

<a {...$$restProps} href={plaintext}>
  <slot />
</a>
