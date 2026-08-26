import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { decode, encode } from "./base-90.js"

const URL_SAFE = /^[A-Za-z0-9._~-]*$/

function roundTrip(value) {
  const encoded = encode(value)
  assert.match(encoded, URL_SAFE)
  assert.equal(encodeURIComponent(encoded), encoded)
  const decoded = decode(encoded)
  assert.deepEqual(decoded, value)
  return encoded
}

describe("base-90", () => {
  it("round-trips strings, including empty and unicode", () => {
    roundTrip("")
    roundTrip("hello")
    roundTrip("hello world")
    roundTrip("🎉")
    roundTrip("a".repeat(100))
  })

  it("round-trips arrays and keeps them distinct from scalars", () => {
    roundTrip([])
    roundTrip([""])
    roundTrip(["hello"])
    roundTrip(["a", "b"])
    roundTrip(["hello world", "foo"])
    roundTrip([["a", "b"], "c"])
    roundTrip([1, 2, 3])

    assert.notEqual(encode("hi"), encode(["hi"]))
    roundTrip("hi")
    roundTrip(["hi"])
  })

  it("never emits a string that decode would treat as a list by accident", () => {
    for (let index = 0; index < 256; index += 1) {
      roundTrip(String.fromCharCode(index))
    }
    for (let index = 0; index < 4096; index += 1) {
      roundTrip([index >> 4, index & 255])
    }
  })

  it("covers remainder block sizes", () => {
    for (let length = 0; length <= 40; length += 1) {
      roundTrip("x".repeat(length))
    }
  })

  it("rejects typed arrays, undefined, and functions", () => {
    assert.throws(() => encode(new Uint8Array([1, 2, 3])), TypeError)
    assert.throws(() => encode(undefined), TypeError)
    assert.throws(() => encode(() => {}), TypeError)
  })

  it("rejects invalid encoded input", () => {
    assert.throws(() => decode("A"), /length/)
    assert.throws(() => decode("hello!"), /Invalid character/)
    assert.throws(() => decode("~~"), /overflow/)
  })
})
