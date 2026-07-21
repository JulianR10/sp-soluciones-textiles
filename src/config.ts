export const CONTACT = {
  whatsapp: '5491112345678',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
} as const;

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp}` as const;
