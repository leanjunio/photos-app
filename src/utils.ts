/**
 * Converts bytes to MB with 1 decimal place precision
 * @param bytes - Bytes to convert to MB
 */
export function bytesToMB(bytes: number) {
  return (bytes / 1000000).toFixed(1);
}