<script lang="ts">
  import { ObfuscatedAnchor, MAILTO_SITE_ADMIN } from '$lib/anchor'
  import { page } from '$app/stores'
</script>

<div class="bg-black text-gray-200 flex flex-col items-center">
  <span class="m-4">
    <a
      class="hover:underline"
      href={`https://github.com/OssianEriksson/255.se/tree/main/src/routes${encodeURIComponent($page.route.id ?? '')}`}
    >
      Redigera på GitHub
    </a>
    | <ObfuscatedAnchor class="hover:underline" href={MAILTO_SITE_ADMIN}>Webbansvarig</ObfuscatedAnchor>
    | {new Date().getUTCFullYear()}
  </span>
</div>
