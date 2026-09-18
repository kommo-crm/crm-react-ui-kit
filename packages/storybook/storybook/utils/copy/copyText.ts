import { legacyCopyText } from './legacyCopyText';

export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).catch(() => legacyCopyText(text));
  } else {
    legacyCopyText(text);
  }
}
