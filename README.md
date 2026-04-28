# PAC2 de M4.257 - Eines HTML i CSS

### Per instalar totes les dependecies de codi
´npm install´

### Per executar el projecte en local
´npm run start´

### Per compilar el projecte i deixar-lo a ./dist
´npm run build´

### Optimitzar les imatges del projecte
`npm run optimize-images`

### Formats d’imatge utilitzats
- Imatges locals en format JPG per a fotos reals de receptes.
- Versions responsives `-400`, `-800` i `-1200` per a cada JPG.
- WebP i AVIF generats amb Sharp per navegadors moderns.
- SVG per a l'hero animat i gràfics vectorials.

### Imatges utilitzades
- `hero-banner.svg`: Banner vectorial animat del hero.
- `photo-paella.jpg`: Imatge de paella valenciana.
- `photo-pasta.jpg`: Imatge de pasta carbonara.
- `photo-amanida.jpg`: Imatge d'amanida grega.
- `photo-cuina.jpg`: Imatge d'ingredients a la cuina.
- `photo-hamburguer.jpg`: Imatge d'hamburguesa casolana.

### Optimització i resultats
El script `npm run optimize-images` genera variants `-400`, `-800` i `-1200` en JPG, WebP i AVIF per a fotos principals.

| Imatge | Format original | Formats nous | Pes original | Pes nou aproximat | % estalvi |
|--------|-----------------|--------------|--------------|------------------|-----------|
| `photo-paella.jpg` | JPG | JPG/WebP/AVIF | 247.5 KB | 134.3 KB (WEBP 1200) | 45.7% |
| `photo-pasta.jpg` | JPG | JPG/WebP/AVIF | 22.3 KB | 12.6 KB (WEBP 400) | 43.5% |
| `photo-fish.jpg` | JPG | JPG/WebP/AVIF | 291.4 KB | 108.5 KB (WEBP 1200) | 62.8% |
| `photo-cuina.jpg` | JPG | JPG/WebP/AVIF | 148.6 KB | 63.4 KB (WEBP 1200) | 57.4% |
| `photo-amanida.jpg` | JPG | JPG/WebP/AVIF | 584.8 KB | 328.3 KB (WEBP 1200) | 43.8% |

### Tècniques responsive aplicades
- `picture`, `srcset` i `sizes` per imatges adaptatives.
- `grid` i `flexbox` per dissenys que funcionen en mòbil, tauleta i escriptori.
- Media queries per adaptar el `hero`, la navegació i les galeries.
- `.responsive-iframe` per a vídeos fluidos.

### Animacions CSS implementades
- `@keyframes float` per a l’hero i transicions suaus en botons i cartes.
- `prefers-reduced-motion` per desactivar moviments als usuaris que ho necessitin.

### Clip-path
- La secció hero utilitza `clip-path` per crear una forma de capçalera dinàmica.

### Accessibilitat i semàntica
- `header`, `nav`, `main`, `section`, `article` i `footer` ben estructurats.
- `lang="ca"` definit al HTML.
- enllaç `Saltar al contingut` per navegació de teclat.
- alt descriptius en totes les imatges i `aria-label` en controls.

### This project is in 
´https://github.com/acampsme/PAC1-eines.git´

### Running on netlify
´https://pac1-eines.netlify.app/´
