import { DEFAULT_SANITY_PREVIEW_PERSPECTIVE } from './presentationContext';

const TOKEN_TTL_MS = 60 * 60 * 1000;

type PreviewTokenPayload = {
  exp: number;
  perspective: string;
};

function getSigningSecret() {
  return process.env.SANITY_PREVIEW_BYPASS_SECRET || process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN || '';
}

function base64UrlEncode(bytes: Uint8Array) {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function sanitizePerspective(value: string | null | undefined) {
  const perspective = value?.trim();

  if (!perspective || !/^[a-zA-Z0-9_.:-]+$/.test(perspective)) {
    return DEFAULT_SANITY_PREVIEW_PERSPECTIVE;
  }

  return perspective;
}

async function getSigningKey() {
  const secret = getSigningSecret();

  if (!secret) {
    return null;
  }

  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

export async function createPreviewToken(perspective?: string | null) {
  const key = await getSigningKey();

  if (!key) {
    return null;
  }

  const payload: PreviewTokenPayload = {
    exp: Date.now() + TOKEN_TTL_MS,
    perspective: sanitizePerspective(perspective),
  };
  const payloadSegment = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadSegment));

  return `${payloadSegment}.${base64UrlEncode(new Uint8Array(signature))}`;
}

export async function verifyPreviewToken(token: string | null | undefined) {
  if (!token) {
    return null;
  }

  const [payloadSegment, signatureSegment] = token.split('.');

  if (!payloadSegment || !signatureSegment) {
    return null;
  }

  const key = await getSigningKey();

  if (!key) {
    return null;
  }

  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    base64UrlDecode(signatureSegment),
    new TextEncoder().encode(payloadSegment),
  );

  if (!valid) {
    return null;
  }

  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadSegment))) as PreviewTokenPayload;

    if (!payload.exp || payload.exp < Date.now()) {
      return null;
    }

    return {
      perspective: sanitizePerspective(payload.perspective),
    };
  } catch {
    return null;
  }
}
