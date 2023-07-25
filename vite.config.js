// cSpell:words imagetools

import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools, resolveConfigs } from 'vite-imagetools'
import doSync from 'do-sync'
import path from 'path'

/** @type {import('imagetools-core').OutputFormat} */
const imageFormat = () => (metadatas) => {
  metadatas.sort((a, b) => b.width - a.width)

  /** @type {{[format: string]: typeof metadatas[number]}} */
  const formats = {}
  metadatas.forEach((meta) => {
    if (!(meta.format in formats)) {
      formats[meta.format] = []
    }
    formats[meta.format].push(meta)
  })

  /** @type {import('&Image').Srcset[]} */
  const sources = Object.entries(formats).map(([format, metas]) => ({
    srcset: metas.map((meta) => `${meta.src} ${meta.width}w`).join(', '),
    type: `image/${format}`,
  }))

  /** @type {string} */
  const file = metadatas[0].image.options.input.file
  const data = doSync.doSync(async (file) => {
    const sharp = global['require']('sharp')
    return (await sharp(file).resize({ width: 20 }).png().toBuffer()).toString('base64')
  })(file)

  /** @type {number | undefined} */
  const metaAspect = metadatas.map((meta) => meta.aspect).find((aspect) => typeof aspect === 'number')
  /** @type {number} */
  const sizeAspect = metadatas[0].width / metadatas[0].height
  const aspect = typeof metaAspect === 'undefined' ? sizeAspect : metaAspect

  /** @type {import('./src/lib/types').Image} */
  return {
    sources,
    placeholder: `data:image/png;base64,${data}`,
    alt: path.parse(file).name,
    aspect,
  }
}

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    imagetools({
      extendOutputFormats: (defaults) => ({ ...defaults, Image: imageFormat }),
      resolveConfigs: (entries, outputFormats) => {
        const out = resolveConfigs(entries, outputFormats)
        return out.map((directives) => {
          if ('Image' in directives) {
            return Object.fromEntries(
              Object.entries(directives).filter(([key, values]) => key !== 'w' || values !== 'full')
            )
          }
          return directives
        })
      },
    }),
  ],
  assetsInclude: ['**/*.xml'],
}

export default config
