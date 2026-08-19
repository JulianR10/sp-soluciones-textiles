export const CONTACT = {
  whatsapp: '5493572541856',
  instagram: 'https://www.instagram.com/estampados.sp/',
  facebook: 'https://www.facebook.com/',
} as const;

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp}` as const;

export const BASE_PATH = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
