<script lang="ts">
  import '../app.css'
  import Footer from './Footer.svelte'
  import Navbar from './Navbar.svelte'

  type Title = { text: string; href?: string }
  type Dropdown = { text: string; href: string }[]
  type NavbarItem = { title: Title; dropdown?: Dropdown }

  const navbarItems: NavbarItem[] = [
    {
      title: {
        text: 'Allmänt',
      },
      dropdown: [
        {
          text: 'Krönikor',
          href: '/krönikor',
        },
        {
          text: 'Ankeboter',
          href: '/ankeboter',
        },
        {
          text: 'Galleri',
          href: '/galleri',
        },
        {
          text: 'Ordlista',
          href: '/ordlista',
        },
        {
          text: 'Gamla sidan',
          href: '/gamla-sidan.html',
        },
      ],
    },
    {
      title: {
        text: 'Filmkväll',
      },
      dropdown: [
        {
          text: 'Röstsystem',
          href: '/röstsystem',
        },
        {
          text: 'Filmlista',
          href: '/filmer',
        },
        {
          text: 'Recensioner',
          href: '/recensioner',
        },
      ],
    },
    {
      title: {
        text: 'Sittning',
      },
      dropdown: [
        {
          text: 'Sångverser',
          href: '/verser',
        },
        {
          text: 'Sittningslokaler',
          href: '/sittningslokaler',
        },
      ],
    },
  ]
</script>

<div id="page" class="min-h-screen flex flex-col">
  <Navbar items={navbarItems}>
    <svelte:fragment slot="title" let:title let:setExpanded>
      {#if 'href' in title}
        <a href={title.href} on:click={() => setExpanded(false)}>{title.text}</a>
      {:else}
        <span>{title.text}</span>
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="dropdown" let:dropdown let:setExpanded>
      {#if dropdown}
        <ul class="text-lg">
          {#each dropdown as subitem}
            <li>
              <a class="hover:underline" href={subitem.href} on:click={() => setExpanded(false)}>
                {subitem.text}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </svelte:fragment>
  </Navbar>
  <div id="content" class="container mx-auto p-2 pb-8 lg:pl-0 lg:pr-0 flex-grow">
    <slot />
  </div>
  <Footer />
</div>

<style lang="postcss">
  #page {
    @apply bg-gray-200;
  }

  #content {
    :global(a:not(.no-style)) {
      @apply underline;
      @apply text-red-900;
    }

    :global(h1) {
      @apply text-3xl;
      @apply font-bold;
      @apply mt-6;
      @apply mb-6;
    }

    :global(h1) {
      @apply text-3xl;
      @apply font-bold;
      @apply mt-6;
      @apply mb-6;
    }

    :global(h2) {
      @apply text-2xl;
      @apply font-bold;
      @apply mt-6;
      @apply mb-4;
    }

    :global(h3) {
      @apply text-xl;
      @apply font-bold;
      @apply mt-4;
      @apply mb-2;
    }

    :global(h4) {
      @apply text-lg;
      @apply font-bold;
      @apply mt-2;
      @apply mb-1;
    }

    :global(p) {
      @apply mt-4;
      @apply mb-4;
    }

    :global(ul) {
      @apply list-disc;
    }

    :global(ol),
    :global(ul) {
      @apply pl-8;
    }

    :global(ol) {
      @apply list-decimal;
    }

    :global(ol ol) {
      @apply list-lower-latin;
    }

    :global(table) {
      @apply overflow-x-auto;
      @apply block;
      @apply mx-auto;
    }

    :global(table) :global(tbody) :global(tr:nth-of-type(2n - 1)) {
      @apply bg-gray-300;
    }

    :global(td),
    :global(th) {
      text-align: inherit;
      @apply p-2;
    }

    :global(blockquote) {
      @apply overflow-auto;
      @apply mt-4;
      @apply mb-4;
      @apply pl-4;
      @apply pr-4;
      @apply bg-gray-300;
      @apply text-gray-800;
      @apply rounded;
    }
  }
</style>
