import { readFileSync, statSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const PRODUCTS = [
  { name: 'buzos', width: 700, quality: 75 },
  { name: 'camiseta-conex', width: 700, quality: 75 },
  { name: 'campera', width: 700, quality: 75 },
  { name: 'camis-trabajo-lux', width: 700, quality: 75 },
  { name: 'cuello-polo3', width: 700, quality: 75 },
  { name: 'pantalones1', width: 700, quality: 75 },
  { name: 'gorras1', width: 560, quality: 60 },
  { name: 'gorritos2', width: 560, quality: 60 },
];

for (const { name, width, quality } of PRODUCTS) {
  const file = `src/assets/${name}.webp`;
  const before = statSync(file).size;
  const data = await sharp(readFileSync(file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, reductionEffort: 6 })
    .toBuffer();
  writeFileSync(file, data);
  const after = statSync(file).size;
  console.log(`${name}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
}

const HERO_BG = 'src/assets/bgmainblur.webp';
const heroSrc = readFileSync(HERO_BG);
const hero1920 = await sharp(heroSrc).resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 60, reductionEffort: 6 }).toBuffer();
writeFileSync(HERO_BG, hero1920);
console.log(`bgmainblur: ${(statSync(HERO_BG).size / 1024).toFixed(0)}KB (1920w)`);
const hero1024 = await sharp(heroSrc).resize({ width: 1024, withoutEnlargement: true })
  .webp({ quality: 60, reductionEffort: 6 }).toBuffer();
writeFileSync('src/assets/bgmainblur-1024.webp', hero1024);
console.log(`bgmainblur-1024: ${(hero1024.length / 1024).toFixed(0)}KB (1024w)`);