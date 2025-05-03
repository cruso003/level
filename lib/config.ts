// lib/config.ts
export const siteConfig = {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Level',
    description: 'NEW WORLD ORDER',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '256701251640',
    contactEmail: 'level@gmail.com',
    socialLinks: {
      instagram: 'https://www.instagram.com/KabiArtista/',
      facebook: 'https://facebook.com/KabiArtista',
      twitter: 'https://twitter.com/KabiArtista',
      tiktok: 'https://tiktok.com/@KabiArtista',
    }
  }
