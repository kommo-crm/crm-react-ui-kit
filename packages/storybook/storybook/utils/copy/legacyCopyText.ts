export function legacyCopyText(text: string): void {
  const el = document.createElement('textarea');

  el.value = text;
  el.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
  document.body.appendChild(el);
  el.select();

  const succeeded = document.execCommand('copy');

  document.body.removeChild(el);

  if (!succeeded) {
    throw new Error('Failed to copy text to clipboard');
  }
}
