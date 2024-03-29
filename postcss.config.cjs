const tailwindcss = require('tailwindcss')
const tailwindcssNesting = require('tailwindcss/nesting')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')

/** @type {import('postcss').Postcss} */
const config = {
  plugins: [
    postcssImport(),
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcssNesting(),
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    autoprefixer,
  ],
}

module.exports = config
