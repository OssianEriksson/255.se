<script lang="ts">
  export let sections: boolean = false
</script>

<h2>Innehåll</h2>
<div class={`[&_li]:list-none [&_ul]:!pl-0 [&_ul_ul]:!pl-4${sections ? ' [&>ul>li]:!mt-4 [&>ul>li>a]:font-bold' : ''}`}>
  <slot />
</div>
