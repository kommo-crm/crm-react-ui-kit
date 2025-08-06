/**
 * Copies the given string to the clipboard using the browser Clipboard API.
 *
 * @param text - The string to copy.
 */
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).catch((err) => {
    console.warn('Failed to copy to clipboard:', err);
  });
}
