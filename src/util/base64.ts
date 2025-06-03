/**
 * To support UTF-8 characters of more than one byte, an intermediary byte array should be used
 * Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa#unicode_strings
 */
export function encodeString(toEncode: string) {
  const bytes = new TextEncoder().encode(toEncode)
  return bytesToBase64(bytes);
}

export function decodeString(toDecode: string): string {
  const bytes = base64ToBytes(toDecode)
  return new TextDecoder().decode(bytes);
}

function bytesToBase64(bytes: Uint8Array) {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte),
  ).join("");
  return btoa(binString);
}

function base64ToBytes(base64: string) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0))
}