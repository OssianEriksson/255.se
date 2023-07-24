<script lang="ts">
  import { onMount } from 'svelte'

  import type { Obfuscated } from '.'
  import { deobfuscate } from '.'

  export let href: Obfuscated

  let clazz: string = ''
  export { clazz as class }

  let plaintext: string = ''
  onMount(() => (plaintext = deobfuscate(href)))
</script>

<a class={clazz} href={plaintext}>
  <slot />
</a>
