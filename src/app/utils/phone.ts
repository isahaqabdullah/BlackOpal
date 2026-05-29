export type PhoneLink = {
  display: string;
  href: string;
};

function normalizePhoneDisplay(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function phoneHref(value: string) {
  const sanitized = value.replace(/[^\d+]/g, '');
  const normalized = sanitized.startsWith('+')
    ? `+${sanitized.slice(1).replace(/\+/g, '')}`
    : sanitized.replace(/\+/g, '');

  return normalized ? `tel:${normalized}` : '';
}

export function formatPhoneNumbers(value?: string) {
  if (!value?.trim()) {
    return [];
  }

  const parts = value
    .replace(/\r\n?/g, '\n')
    .replace(/([^\s])(\+\d)/g, '$1\n$2')
    .replace(/\s+(\+\d)/g, '\n$1')
    .split(/\s*(?:\n|[;,|/]|&|\band\b)\s*/i)
    .map(normalizePhoneDisplay)
    .filter((part) => (part.match(/\d/g)?.length ?? 0) >= 5);

  const seen = new Set<string>();

  return parts
    .map((display) => ({ display, href: phoneHref(display) }))
    .filter((phone): phone is PhoneLink => Boolean(phone.href))
    .filter((phone) => {
      if (seen.has(phone.href)) {
        return false;
      }

      seen.add(phone.href);
      return true;
    });
}

export function firstPhoneNumber(value?: string) {
  return formatPhoneNumbers(value)[0];
}
