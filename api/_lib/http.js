export const VISUAL_PREVIEW_COOKIE_NAME = 'black-opal-sanity-preview';

export function getRequestUrl(request) {
  const forwardedProto = request.headers['x-forwarded-proto'];
  const forwardedHost = request.headers['x-forwarded-host'];
  const protocol = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto;
  const host = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost || request.headers.host || 'localhost';
  const resolvedProtocol = protocol || (host.includes('localhost') || host.startsWith('127.') ? 'http' : 'https');

  return new URL(request.url || '/', `${resolvedProtocol}://${host}`);
}

export function readCookies(request) {
  const header = request.headers.cookie;

  if (!header) {
    return {};
  }

  return Object.fromEntries(
    header
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const separator = item.indexOf('=');
        const name = separator === -1 ? item : item.slice(0, separator);
        const value = separator === -1 ? '' : item.slice(separator + 1);
        return [decodeURIComponent(name), decodeURIComponent(value)];
      }),
  );
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }

  parts.push(`Path=${options.path || '/'}`);

  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }

  if (options.httpOnly) {
    parts.push('HttpOnly');
  }

  if (options.secure) {
    parts.push('Secure');
  }

  return parts.join('; ');
}

export function setCookie(response, name, value, options = {}) {
  const nextCookie = serializeCookie(name, value, options);
  const current = response.getHeader('Set-Cookie');
  const cookies = Array.isArray(current) ? current : current ? [current] : [];

  response.setHeader('Set-Cookie', [...cookies, nextCookie]);
}

export function clearCookie(response, name, requestUrl, options = {}) {
  setCookie(response, name, '', {
    path: '/',
    maxAge: 0,
    sameSite: cookieSameSite(requestUrl),
    secure: requestUrl.protocol === 'https:',
    ...options,
  });
}

export function cookieSameSite(requestUrl) {
  return requestUrl.protocol === 'https:' ? 'None' : 'Lax';
}

export function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(body));
}

export function sendText(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(body);
}

export function redirect(response, location, statusCode = 307) {
  response.statusCode = statusCode;
  response.setHeader('Location', location);
  response.setHeader('Cache-Control', 'no-store');
  response.end();
}
