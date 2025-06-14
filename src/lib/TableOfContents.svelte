<script lang="ts">
  export let sections: boolean = false
</script>

<h2>Innehåll</h2>
<div
  class={`${sections ? '[&>ul_ul]:!pl-4 [&>ul]:!pl-0 [&>ul>li]:list-none [&>ul>li]:!mt-4 [&>ul>li>a]:font-bold' : '[&>ul]:!pl-4'}`}
>
  <slot />
</div>
