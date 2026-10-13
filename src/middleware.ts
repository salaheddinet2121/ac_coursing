import { defineMiddleware } from 'astro:middleware';
import { client } from './data/client';

/**
 * Canonical URL enforcement — one hop to the final URL.
 *
 *  • www.ac-coursing.fr/*  → ac-coursing.fr/*   (every path, including "/")
 *  • /path/                → /path              (homepage keeps "/")
 *
 * Both fixes are combined into a single 301 so a request like
 * https://www.ac-coursing.fr/services/seniors/ never chains. The reverse
 * proxy should do the same at the edge; this is the in-app guarantee.
 */
export const onRequest = defineMiddleware((context, next) => {
  const { request } = context;
  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  const url = new URL(request.url);
  const host = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? url.host)
    .split(',')[0]
    .trim()
    .toLowerCase();

  const isWww = host.startsWith('www.');
  const hasSlash = url.pathname.length > 1 && url.pathname.endsWith('/');
  if (!isWww && !hasSlash) return next();

  const pathname = hasSlash ? url.pathname.replace(/\/+$/, '') || '/' : url.pathname;
  // Relative target when only the slash is wrong: url.origin behind a proxy can be internal.
  const origin = isWww ? client.domain : '';
  return context.redirect(`${origin}${pathname}${url.search}`, 301);
});
