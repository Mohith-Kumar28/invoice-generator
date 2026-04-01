import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] }
    ],
    sitemap: 'https://invoiceforge.app/sitemap.xml',
    host: 'https://invoiceforge.app'
  };
}
