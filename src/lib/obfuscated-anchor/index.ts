/*
export const obfuscate = (plaintext: Plaintext): Obfuscated =>
	plaintext.split('').reverse().map((c) => c.charCodeAt(0))
*/

export const deobfuscate = (obfuscated: Obfuscated): string =>
  obfuscated
    .map((c) => String.fromCharCode(c))
    .reverse()
    .join('')

export const MAILTO_SITE_ADMIN = [
  101, 115, 46, 115, 105, 99, 110, 97, 100, 64, 111, 108, 108, 101, 104, 58, 111, 116, 108, 105, 97, 109,
] as const

export type Obfuscated = typeof MAILTO_SITE_ADMIN

export { default as ObfuscatedAnchor } from './ObfuscatedAnchor.svelte'
