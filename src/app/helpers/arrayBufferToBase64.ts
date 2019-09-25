/**
 * Converts Buffer to Base64 sring.
 * @param buffer Buffer that will be converted to Base64 type.
 * @returns Base64 string without header. 
*/

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};