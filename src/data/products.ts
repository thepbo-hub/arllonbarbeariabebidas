import { Product } from '../types';

export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/15tWcqT5/d36b31c4-82c7-4f0a-b040-58e5d065b86b.png';
export const HERO_VIDEO_URL = 'https://yourimageshare.com/ib/CufIM3MjZf.mp4';
export const LOCAL_HERO_VIDEO_URL = '/videos/hero-barbearia.mp4';
export const WHATSAPP_LINK_DESTINATION = 'https://wa.link/8q3k2r';
export const WHATSAPP_PHONE = '5521965135344';

export const PRODUCTS: Product[] = [
  {
    id: 'guarana-antarctica',
    name: 'Guaraná Antarctica',
    price: 6.00,
    priceInCents: 600,
    image: 'https://i.postimg.cc/mgCN5f1Y/image-png-2ddc8323.png',
    videoUrl: 'https://yourimageshare.com/ib/tdRN5DubTz.mp4',
    localVideoUrl: '/videos/guarana-antarctica.mp4',
    description: 'O sabor autêntico brasileiro com a efervescência ideal para refrescar o seu atendimento.',
    animationType: 'guarana',
    category: 'Refrigerantes',
    mais_vendido: true
  },
  {
    id: 'guaravita',
    name: 'Guaravita',
    price: 3.00,
    priceInCents: 300,
    image: 'https://i.postimg.cc/FzXpWWWP/Guaravita3.png',
    videoUrl: 'https://yourimageshare.com/ib/5o4FQhEb8S.mp4',
    localVideoUrl: '/videos/guaravita.mp4',
    description: 'Clássico carioca leve, doce e revigorante, perfeito para um momento de pausa.',
    animationType: 'guaravita',
    category: 'Sucos e Refrescos',
    mais_vendido: true
  },
  {
    id: 'guaraviton',
    name: 'Guaraviton',
    price: 6.00,
    priceInCents: 600,
    image: 'https://i.postimg.cc/bwpHWVxF/image-png-dac2db88.png',
    videoUrl: 'https://yourimageshare.com/ib/z8P554iUp9.mp4',
    localVideoUrl: '/videos/guaraviton.mp4',
    description: 'Dose extra de energia natural com extrato de guaraná para renovar o seu dia.',
    animationType: 'guaraviton',
    category: 'Sucos e Refrescos',
    mais_vendido: false
  },
  {
    id: 'h2oh',
    name: 'H2OH!',
    price: 8.00,
    priceInCents: 800,
    image: 'https://i.postimg.cc/cLwMbytw/image-png-34f33fe3.png',
    videoUrl: 'https://yourimageshare.com/ib/Bwu8LHtLWV.mp4',
    localVideoUrl: '/videos/h2oh.mp4',
    description: 'Leveza gaseificada com toque suave de limão e zero açúcar para máximo frescor.',
    animationType: 'h2oh',
    category: 'Refrigerantes',
    mais_vendido: false
  },
  {
    id: 'monster-energy',
    name: 'Monster Energy',
    price: 14.00,
    priceInCents: 1400,
    image: 'https://i.postimg.cc/cLwMbyt3/image-png-8167efd6.png',
    videoUrl: 'https://yourimageshare.com/ib/JFGFh8UfxE.mp4',
    localVideoUrl: '/videos/monster-energy.mp4',
    description: 'Potência e intensidade sem concessões para quem busca foco e presença marcante.',
    animationType: 'monster',
    category: 'Energéticos',
    mais_vendido: true
  },
  {
    id: 'powerade',
    name: 'Powerade',
    price: 8.00,
    priceInCents: 800,
    image: 'https://i.postimg.cc/vZfLNFx4/image-png-52856798.png',
    videoUrl: 'https://yourimageshare.com/ib/oN6ksSY1Yp.mp4',
    localVideoUrl: '/videos/powerade.mp4',
    description: 'Hidratação dinâmica enriquecida com eletrólitos e sabor vibrante.',
    animationType: 'powerade',
    category: 'Isotônicos',
    mais_vendido: false
  },
  {
    id: 'red-bull',
    name: 'Red Bull',
    price: 15.00,
    priceInCents: 1500,
    image: 'https://i.postimg.cc/GpNqYhkH/Red-Bull15.webp',
    videoUrl: 'https://yourimageshare.com/ib/LUOuVWYWa3.mp4',
    localVideoUrl: '/videos/red-bull.mp4',
    description: 'Vitaliza mente e corpo com fórmula reconhecida mundialmente em temperatura extremamente gelada.',
    animationType: 'redbull',
    category: 'Energéticos',
    mais_vendido: true
  },
  {
    id: 'agua-com-gas',
    name: 'Água com gás',
    price: 4.00,
    priceInCents: 400,
    image: 'https://i.postimg.cc/bN30kwhH/Agua-com-gas4.png',
    videoUrl: 'https://yourimageshare.com/ib/f6EwDpF5H1.mp4',
    localVideoUrl: '/videos/agua-com-gas.mp4',
    description: 'Água mineral pura e cristalina com borbulhas finas para máxima hidratação e sofisticação.',
    animationType: 'aguacomgas',
    category: 'Águas',
    mais_vendido: false
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    price: 6.00,
    priceInCents: 600,
    image: 'https://i.postimg.cc/DyCVPKJm/Coca-Cola-normal-e-zero.png',
    videoUrl: 'https://yourimageshare.com/ib/eFA6Jbp0Sk.mp4',
    localVideoUrl: '/videos/coca-cola.mp4',
    description: 'O sabor inconfundível na medida certa. Escolha entre a receita Original ou Zero açúcar.',
    animationType: 'cocacola',
    category: 'Refrigerantes',
    hasVariants: true,
    variants: ['Original', 'Zero'],
    defaultVariant: 'Original',
    mais_vendido: true
  },
  {
    id: 'fanta-laranja',
    name: 'Fanta Laranja',
    price: 6.00,
    priceInCents: 600,
    image: 'https://i.postimg.cc/TYCjg36C/Fanta-laranja6.png',
    videoUrl: 'https://yourimageshare.com/ib/BavnnCHpbR.mp4',
    localVideoUrl: '/videos/fanta-laranja.mp4',
    description: 'Explosão cítrica marcante e refrescante com a cremosidade clássica que todo mundo conhece.',
    animationType: 'fanta',
    category: 'Refrigerantes',
    mais_vendido: false
  },
  {
    id: 'h2oh-limoneto',
    name: 'H2OH! Limoneto',
    price: 8.00,
    priceInCents: 800,
    image: 'https://i.postimg.cc/pXqQzLH0/H2O-Limoneto8.png',
    videoUrl: 'https://yourimageshare.com/ib/mrcnj5mjdH.mp4',
    localVideoUrl: '/videos/h2oh-limoneto.mp4',
    description: 'Acidez equilibrada e aroma refinado de limões selecionados em uma bebida leve e sem calorias.',
    animationType: 'limoneto',
    category: 'Refrigerantes',
    mais_vendido: false
  },
  {
    id: 'sprite',
    name: 'Sprite',
    price: 6.00,
    priceInCents: 600,
    image: 'https://i.postimg.cc/028dzJL7/Sprite6.png',
    videoUrl: 'https://yourimageshare.com/ib/zyvIgGwWsW.mp4',
    localVideoUrl: '/videos/sprite.mp4',
    description: 'Sabor revigorante de lima-limão com borbulhas límpidas e refrescância imediata.',
    animationType: 'sprite',
    category: 'Refrigerantes',
    mais_vendido: false
  },
  {
    id: 'tita-citrus',
    name: 'Tita Citrus',
    price: 3.00,
    priceInCents: 300,
    image: 'https://i.postimg.cc/yYfqyzgK/Tita-Citrus.png',
    videoUrl: 'https://yourimageshare.com/ib/eAQhsLtHwe.mp4',
    localVideoUrl: '/videos/tita-citrus.mp4',
    description: 'Bebida prática e saborosa de frutas cítricas, levemente adocicada para acompanhar o corte.',
    animationType: 'tita',
    category: 'Sucos e Refrescos',
    mais_vendido: false
  }
];
