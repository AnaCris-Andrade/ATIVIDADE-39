import { Product } from '../types';
import rasteiraGladiadoraImg from '../assets/images/rasteira_gladiadora_1790640139704.jpg';
import tenisKnitImg from '../assets/images/tenis_knit_1790640150073.jpg';
import sandaliaSaltoImg from '../assets/images/sandalia_salto_1790640158668.jpg';
import rasteiraPedrariasImg from '../assets/images/rasteira_pedrarias_1790640169644.jpg';
import mocassimCouroImg from '../assets/images/mocassim_couro_1790640179918.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'rasteira-gladiadora',
    name: 'Rasteira Gladiadora',
    category: 'rasteiras',
    categoryLabel: 'Rasteiras',
    price: 269.90,
    originalPrice: 319.90,
    description: 'Rasteira com tiras delicadas, bico quadrado e fechada. Um modelo elegante e confortável.',
    details: [
      'Confeccionada em couro 100% legítimo com toque macio',
      'Design gladiador fechado no calcanhar com fivela ajustável',
      'Bico quadrado contemporâneo que valoriza o calce',
      'Palmilha acolchoada em espuma de memória',
      'Solado em borracha antiderrapante com acabamento refinado'
    ],
    image: rasteiraGladiadoraImg,
    sizes: [34, 35, 36, 37, 38, 39, 40],
    colors: ['Off-White Neve', 'Caramelo Natural', 'Preto Clássico'],
    material: 'Couro Bovino Nobre',
    highlight: 'Mais Vendida'
  },
  {
    id: 'tenis-knit',
    name: 'Tênis Casual Knit',
    category: 'tenis',
    categoryLabel: 'Tênis',
    price: 299.90,
    originalPrice: 359.90,
    description: 'Tênis leve e confortável, confeccionado em malha Knit respirável. Ideal para o dia a dia, caminhadas e looks casuais.',
    details: [
      'Malha Knit tecnológica respirável de altíssima elasticidade',
      'Detalhes e puxadores em couro legítimo',
      'Solado robusto em EVA ultraleve com ranhuras tratoradas',
      'Palmilha antibacteriana com amortecimento progressivo',
      'Calce fácil estilo slip-on com amarração frontal para ajuste ideal'
    ],
    image: tenisKnitImg,
    sizes: [34, 35, 36, 37, 38, 39],
    colors: ['Caramelo Terracota', 'Preto Ônix', 'Bege Areia'],
    material: 'Knit Tecnológico & Couro',
    highlight: 'Conforto Extremo'
  },
  {
    id: 'sandalia-salto',
    name: 'Sandália de Salto Geométrico',
    category: 'saltos',
    categoryLabel: 'Saltos',
    price: 349.90,
    originalPrice: 429.90,
    description: 'Sandália elegante com bico folha e salto geométrico. Um modelo sofisticado e confortável.',
    details: [
      'Salto geométrico de 7.5cm com base ampla para equilíbrio impecável',
      'Design bico folha que alonga a silhueta',
      'Tira slingback com elástico e fivela dourada antioxidante',
      'Forro interno em couro respirável para evitar atrito',
      'Solado laqueado com insert antiderrapante na planta dos pés'
    ],
    image: sandaliaSaltoImg,
    sizes: [35, 36, 37, 38, 39],
    colors: ['Dourado Champagne', 'Preto Sofisticado', 'Nude Rosé'],
    material: 'Couro Metalizado e Mestiço',
    highlight: 'Destaque Festa'
  },
  {
    id: 'sandalia-rasteira-tachas',
    name: 'Sandália Rasteira com Pedrarias',
    category: 'rasteiras',
    categoryLabel: 'Rasteiras',
    price: 499.90,
    originalPrice: 589.90,
    description: 'Rasteira em couro com aplicação de tachas douradas e pedras verdes. Unindo conforto, elegância e um toque artesanal.',
    details: [
      'Aplicação artesanal de pedras nobres verdes e tachas douradas banhadas',
      'Couro legítimo macio de curtimento vegetal sustentável',
      'Tiras assimétricas que contornam o peito do pé com delicadeza',
      'Fechamento no tornozelo com fivela delicada',
      'Acabamento costurado à mão de alta durabilidade'
    ],
    image: rasteiraPedrariasImg,
    sizes: [34, 35, 36, 37, 38, 39, 40],
    colors: ['Marrom Café', 'Caramelo Artesanal'],
    material: 'Couro Nobre & Pedrarias Exclusivas',
    highlight: 'Edição Especial Artesanal'
  },
  {
    id: 'mocassim-couro',
    name: 'Mocassim Tradicional em Couro',
    category: 'mocassins',
    categoryLabel: 'Mocassins',
    price: 199.90,
    originalPrice: 249.90,
    description: 'Mocassim confeccionado em couro macio. Um modelo confortável, versátil e elegante.',
    details: [
      'Estrutura em couro floater extra macio com toque aveludado',
      'Costura manual no cabedal com laço clássico frontal',
      'Palmilha interna forrada em couro com microperfurações de ventilação',
      'Solado flexível que acompanha o movimento natural dos pés',
      'Ideal para compor looks de trabalho e passeio despretensioso'
    ],
    image: mocassimCouroImg,
    sizes: [34, 35, 36, 37, 38, 39, 40],
    colors: ['Nude Blush', 'Bege Fendi', 'Caramelo Toffee'],
    material: 'Couro Floater Genuíno',
    highlight: 'Melhor Custo-Benefício'
  }
];

export const SIZE_CHART = [
  { size: 34, lengthCm: '22,7 cm', footWidth: '8,4 cm' },
  { size: 35, lengthCm: '23,3 cm', footWidth: '8,6 cm' },
  { size: 36, lengthCm: '24,0 cm', footWidth: '8,8 cm' },
  { size: 37, lengthCm: '24,7 cm', footWidth: '9,0 cm' },
  { size: 38, lengthCm: '25,3 cm', footWidth: '9,2 cm' },
  { size: 39, lengthCm: '26,0 cm', footWidth: '9,4 cm' },
  { size: 40, lengthCm: '26,7 cm', footWidth: '9,6 cm' },
];
