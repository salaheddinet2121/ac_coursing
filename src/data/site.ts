import { client } from './client';

export const siteMeta = {
  siteUrl: client.domain,
  phoneLink: client.phoneForTel,
  phoneDisplay: client.phoneFormatted,
} as const;
