// JSON values -> path-safe string (and back).
//
// RFC 3986 unreserved is 66 chars (A-Z a-z 0-9 -._~), but `.` and `~` are not
// safe in URL path tokens: hosts treat a last segment with `.` as a file
// (Vite history fallback, Cloudflare Pages / Workers SPA assets) and skip
// the SPA rewrite. `encodeURIComponent` also leaves both characters alone.
//
// Alphabet is therefore base64url (64 chars: A-Z a-z 0-9 -_). Dense enough
// to sit in a path, query, or fragment with no encoding, without looking
// like a filename. A 90-char alphabet cannot be URL-safe.
//
// Arrays (including nested and single-element) round-trip as arrays because
// the payload is JSON, not a delimiter join.

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "abcdefghijklmnopqrstuvwxyz" +
  "0123456789" +
  "-_"

const BASE = 64n

const DIGIT_BY_CHAR = (() => {
  const digits = new Map()
  for (let index = 0; index < ALPHABET.length; index += 1) {
    digits.set(ALPHABET[index], index)
  }
  return digits
})()

const FULL_BYTES = 8
const FULL_CHARS = 11 // 64^11 = 2^66 >= 2^64 > 64^10 = 2^60

// Remainder r bytes (1..7) -> fewest digits k with 64^k >= 256^r
const REM_TO_K = [0, 2, 3, 4, 6, 7, 8, 10]
// Decode remainder from (len % 11), which equals k for the tail
const MOD_TO_REM = new Map([
  [2, 1],
  [3, 2],
  [4, 3],
  [6, 4],
  [7, 5],
  [8, 6],
  [10, 7]
])

function encodeFixed(value, width) {
  const characters = new Array(width)
  for (let index = width - 1; index >= 0; index -= 1) {
    characters[index] = ALPHABET[Number(value % BASE)]
    value /= BASE
  }
  return characters.join("")
}

function decodeFixed(text) {
  let value = 0n
  for (const character of text) {
    const digit = DIGIT_BY_CHAR.get(character)
    if (digit === undefined) {
      throw new Error(`Invalid character: ${JSON.stringify(character)}`)
    }
    value = value * BASE + BigInt(digit)
  }
  return value
}

function packBE(bytes, offset, count) {
  let value = 0n
  for (let index = 0; index < count; index += 1) {
    value = (value << 8n) | BigInt(bytes[offset + index])
  }
  return value
}

function unpackBE(value, count) {
  const bytes = new Uint8Array(count)
  for (let index = count - 1; index >= 0; index -= 1) {
    bytes[index] = Number(value & 255n)
    value >>= 8n
  }
  if (value !== 0n) {
    throw new Error("Invalid Base90 payload (overflow)")
  }
  return bytes
}

function concatBytes(chunks) {
  let total = 0
  for (const chunk of chunks) total += chunk.length
  const bytes = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.length
  }
  return bytes
}

function encodeBytes(bytes) {
  const chunks = []
  const fullLength = Math.floor(bytes.length / FULL_BYTES) * FULL_BYTES
  for (let index = 0; index < fullLength; index += FULL_BYTES) {
    chunks.push(encodeFixed(packBE(bytes, index, FULL_BYTES), FULL_CHARS))
  }
  const remainder = bytes.length - fullLength
  if (remainder) {
    chunks.push(
      encodeFixed(packBE(bytes, fullLength, remainder), REM_TO_K[remainder])
    )
  }
  return chunks.join("")
}

function decodeBytes(text) {
  if (text.length === 0) return new Uint8Array(0)

  const modulus = text.length % FULL_CHARS
  const remainder = modulus === 0 ? 0 : MOD_TO_REM.get(modulus)
  if (remainder === undefined) {
    throw new Error("Invalid Base90 length (bad tail size)")
  }

  const fullCharsLength = text.length - modulus
  const chunks = []

  for (let index = 0; index < fullCharsLength; index += FULL_CHARS) {
    chunks.push(
      unpackBE(decodeFixed(text.slice(index, index + FULL_CHARS)), FULL_BYTES)
    )
  }

  if (remainder) {
    chunks.push(unpackBE(decodeFixed(text.slice(fullCharsLength)), remainder))
  }

  return concatBytes(chunks)
}

export function encode(data) {
  if (
    typeof data === "bigint" ||
    typeof data === "function" ||
    typeof data === "symbol"
  ) {
    throw new TypeError("encode() accepts JSON values")
  }
  if (data !== null && typeof data === "object" && ArrayBuffer.isView(data)) {
    throw new TypeError("encode() accepts JSON values, not typed arrays")
  }

  const json = JSON.stringify(data)
  if (json === undefined) {
    throw new TypeError("encode() accepts JSON values")
  }

  return encodeBytes(new TextEncoder().encode(json))
}

export function decode(text) {
  if (typeof text !== "string") {
    throw new TypeError("decode() expects a string")
  }

  const json = new TextDecoder("utf-8", { fatal: true }).decode(
    decodeBytes(text)
  )
  return JSON.parse(json)
}
