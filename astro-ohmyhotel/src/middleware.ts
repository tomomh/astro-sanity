import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // No special handling needed for query param based i18n
  // Language is determined from ?hl= param in each page/layout
  return next();
});
