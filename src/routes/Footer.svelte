<script lang="ts">
  import { ObfuscatedAnchor, MAILTO_HELLO_DANCIS_SE } from '$lib/obfuscated-anchor'
</script>

<div class="bg-gray-200 flex flex-col items-center">
  <span class="m-4">
    <a class="hover:underline" href="https://github.com/OssianEriksson/255.se/tree/main/src/routes">
      Redigera på GitHub
    </a>
    | <ObfuscatedAnchor class="hover:underline" href={MAILTO_HELLO_DANCIS_SE}>Webbansvarig</ObfuscatedAnchor>
    | {new Date().getUTCFullYear()}
  </span>
</div>
