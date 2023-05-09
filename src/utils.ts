const BYTES_PER_MEGABYTE = 1048576;

/**
 * Converts bytes to MB with 1 decimal place precision
 * @param bytes - Bytes to convert to MB
 */
export function bytesToMB(bytes: number) {
  return (bytes / BYTES_PER_MEGABYTE).toFixed(1);
}