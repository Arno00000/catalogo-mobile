// src/utils/productTranslations.js

/**
 * CAMADA DE LOCALIZAÇÃO DOS PRODUTOS.
 *
 * A API DummyJSON é pública e devolve os nomes e as descrições dos
 * produtos em inglês. Como o aplicativo é em português, esta camada
 * traduz esses textos no momento da exibição.
 *
 * Decisões importantes:
 *
 * 1. A tradução acontece na APRESENTAÇÃO, não altera o dado da API.
 *    O serviço continua recebendo a resposta original; apenas o texto
 *    mostrado ao usuário é substituído.
 *
 * 2. O dicionário é indexado pelo ID do produto, que é estável na API.
 *
 * 3. Existe FALLBACK: se um produto não estiver no dicionário, o texto
 *    original em inglês é exibido. O aplicativo nunca quebra nem mostra
 *    campo vazio por falta de tradução.
 *
 * 4. Nomes de marcas (Nike, Rolex, Prada, Puma...) são mantidos, porque
 *    marca própria não se traduz.
 */

const PRODUCT_TRANSLATIONS = {
  // ===== mens-shirts — Camisetas =====
  83: {
    title: 'Camisa Xadrez Azul e Preta',
    description:
      'A Camisa Xadrez Azul e Preta é uma peça masculina estilosa e confortável, com o clássico padrão xadrez. Feita com tecido de alta qualidade, combina tanto com ocasiões casuais quanto semiformais.',
  },
  84: {
    title: 'Camiseta Gigabyte Aorus',
    description:
      'A Camiseta Gigabyte Aorus é uma peça casual e descolada para quem gosta de games. Com o logo da Aorus e design moderno, é perfeita para expressar o seu estilo gamer.',
  },
  85: {
    title: 'Camisa Masculina Xadrez',
    description:
      'A Camisa Masculina Xadrez é atemporal e versátil, com o padrão xadrez clássico. O caimento confortável e o estilo casual fazem dela uma peça essencial no guarda-roupa.',
  },
  86: {
    title: 'Camisa Masculina Manga Curta',
    description:
      'A Camisa Masculina Manga Curta é uma opção leve e elegante para os dias quentes. Com caimento confortável e mangas curtas, garante um visual descontraído e bem cuidado.',
  },
  87: {
    title: 'Camisa Masculina Quadriculada',
    description:
      'A Camisa Masculina Quadriculada é clássica e versátil, com um padrão xadrez elegante. Adequada para diversas ocasiões, dá um toque sofisticado ao seu guarda-roupa.',
  },

  // ===== mens-shoes — Calçados masculinos =====
  88: {
    title: 'Nike Air Jordan 1 Vermelho e Preto',
    description:
      'O Nike Air Jordan 1 em vermelho e preto é um tênis de basquete icônico, reconhecido pelo design marcante e pelo alto desempenho. É um dos favoritos entre colecionadores e atletas.',
  },
  89: {
    title: 'Chuteira de Beisebol Nike',
    description:
      'A Chuteira de Beisebol Nike foi desenvolvida para oferecer o máximo de aderência e desempenho no campo. Garante estabilidade e apoio ao jogador durante jogos e treinos.',
  },
  90: {
    title: 'Tênis Puma Future Rider',
    description:
      'O Tênis Puma Future Rider une o estilo retrô ao conforto moderno. Ideal para o uso casual, é uma opção confortável e cheia de personalidade para o dia a dia.',
  },
  91: {
    title: 'Tênis Esportivo Off White e Vermelho',
    description:
      'O Tênis Esportivo em off white e vermelho combina estilo e funcionalidade, sendo uma escolha certeira para quem pratica esportes. A combinação de cores dá um toque marcante e cheio de energia.',
  },
  92: {
    title: 'Tênis Esportivo Off White Vermelho',
    description:
      'Outra versão do Tênis Esportivo em off white e vermelho, com um design exclusivo. Oferece estilo e conforto para as ocasiões casuais do dia a dia.',
  },

  // ===== mens-watches — Relógios masculinos =====
  93: {
    title: 'Relógio com Pulseira de Couro Marrom',
    description:
      'O Relógio com Pulseira de Couro Marrom é uma peça elegante de design clássico. Com pulseira em couro legítimo e mostrador refinado, acrescenta sofisticação ao visual.',
  },
  94: {
    title: 'Longines Master Collection',
    description:
      'O Longines Master Collection é um relógio elegante e refinado, conhecido pela precisão e pelo apuro no acabamento. Com design atemporal, é um símbolo de luxo e sofisticação.',
  },
  95: {
    title: 'Rolex Cellini Date Mostrador Preto',
    description:
      'O Rolex Cellini Date com mostrador preto é um relógio clássico e prestigiado. Com indicação de data, transmite sofisticação e representa a tradição da Rolex.',
  },
  96: {
    title: 'Rolex Cellini Moonphase',
    description:
      'O Rolex Cellini Moonphase é uma obra-prima da relojoaria, com complicação de fases da lua e acabamento primoroso. Reflete o compromisso da Rolex com a precisão e a elegância.',
  },
  97: {
    title: 'Rolex Datejust',
    description:
      'O Rolex Datejust é um relógio icônico e versátil, com janela de data. Reconhecido pelo design atemporal e pela confiabilidade, representa a excelência da relojoaria Rolex.',
  },
  98: {
    title: 'Rolex Submariner',
    description:
      'O Rolex Submariner é um lendário relógio de mergulho com uma história rica. Conhecido pela resistência e pela vedação contra água, é um símbolo de aventura e exploração.',
  },

  // ===== womens-bags — Bolsas =====
  172: {
    title: 'Bolsa Feminina Azul',
    description:
      'A Bolsa Feminina Azul é um acessório estiloso e espaçoso para o dia a dia. Com azul vibrante e vários compartimentos, une moda e funcionalidade.',
  },
  173: {
    title: 'Bolsa de Couro Heshe',
    description:
      'A Bolsa de Couro Heshe é uma peça sofisticada, feita em couro de alta qualidade. Com design atemporal e acabamento durável, é um acessório versátil para diversas ocasiões.',
  },
  174: {
    title: 'Bolsa Feminina Prada',
    description:
      'A Bolsa Feminina Prada é uma peça de grife icônica, que transmite elegância e luxo. Confeccionada com precisão e com o logo da Prada, é um destaque para quem acompanha moda.',
  },
  175: {
    title: 'Mochila Branca de Couro Sintético',
    description:
      'A Mochila Branca de Couro Sintético é moderna e prática para a mulher contemporânea. Com design clean em branco e bastante espaço interno, funciona bem no casual e na correria do dia.',
  },
  176: {
    title: 'Bolsa Feminina Preta',
    description:
      'A Bolsa Feminina Preta é um acessório clássico e versátil, que combina com diversos looks. Com a atemporalidade do preto e design funcional, é item obrigatório no guarda-roupa.',
  },

  // ===== womens-dresses — Vestidos =====
  177: {
    title: 'Vestido Longo Preto',
    description:
      'O Vestido Longo Preto é elegante e atemporal. Com design preto sofisticado, é perfeito para eventos formais e ocasiões especiais, transmitindo classe e estilo.',
  },
  178: {
    title: 'Corselet de Couro com Saia',
    description:
      'O Corselet de Couro com Saia é um conjunto marcante e ousado, que combina um corselet estiloso com saia da mesma linha. Ideal para quem gosta de moda, chama atenção em qualquer evento.',
  },
  179: {
    title: 'Corselet com Saia Preta',
    description:
      'O Corselet com Saia Preta é um conjunto chique e versátil, que une um corselet moderno a uma saia preta clássica. Oferece um visual harmonioso para diversas ocasiões.',
  },
  180: {
    title: 'Vestido Estampado Casual',
    description:
      'O Vestido Estampado Casual é confortável e estiloso, com estampa delicada. Perfeito para passeios do dia a dia, traz um toque leve e divertido ao guarda-roupa.',
  },
  181: {
    title: 'Conjunto Marni Vermelho e Preto',
    description:
      'O Conjunto Marni Vermelho e Preto é sofisticado e moderno. Combinando tons de vermelho e preto, apresenta um design contemporâneo para um visual marcante e cheio de confiança.',
  },

  // ===== womens-jewellery — Joias =====
  182: {
    title: 'Brinco de Cristal Verde',
    description:
      'O Brinco de Cristal Verde é um acessório deslumbrante, com um cristal verde vibrante. De design clássico, acrescenta elegância ao visual e é perfeito para eventos formais ou especiais.',
  },
  183: {
    title: 'Brinco Oval Verde',
    description:
      'O Brinco Oval Verde é um acessório estiloso e versátil, com formato oval diferenciado. Serve tanto para o casual quanto para ocasiões mais elaboradas, com tom verde e design contemporâneo.',
  },
  184: {
    title: 'Brinco Tropical',
    description:
      'O Brinco Tropical é um acessório divertido e descontraído, inspirado em elementos tropicais. Com cores vibrantes e design alegre, é perfeito para dar um toque de verão ao visual.',
  },

  // ===== womens-shoes — Calçados femininos =====
  185: {
    title: 'Chinelo Preto e Marrom',
    description:
      'O Chinelo Preto e Marrom é confortável e estiloso, ideal para o uso casual. A combinação de preto e marrom acrescenta um toque de sofisticação aos momentos de descanso.',
  },
  186: {
    title: 'Scarpin Calvin Klein',
    description:
      'O Scarpin Calvin Klein é elegante e sofisticado, pensado para ocasiões formais. Com design clássico e materiais de alta qualidade, complementa looks mais refinados.',
  },
  187: {
    title: 'Sapato Feminino Dourado',
    description:
      'O Sapato Feminino Dourado é uma escolha glamourosa para ocasiões especiais. Com acabamento dourado e design elegante, acrescenta um toque de luxo à produção.',
  },
  188: {
    title: 'Sapato Pampi',
    description:
      'O Sapato Pampi combina conforto e estilo para o uso diário. Com design versátil, funciona bem em diferentes ocasiões casuais, garantindo um visual moderno e relaxado.',
  },
  189: {
    title: 'Sapato Vermelho',
    description:
      'O Sapato Vermelho é uma peça marcante, com um vermelho vibrante. Seja para uma festa ou um passeio casual, acrescenta cor e personalidade ao guarda-roupa.',
  },

  // ===== womens-watches — Relógios femininos =====
  190: {
    title: 'IWC Ingenieur Automático em Aço',
    description:
      'O relógio IWC Ingenieur Automático em Aço é resistente e sofisticado. Com caixa em aço inoxidável e movimento automático, une precisão e estilo para os apreciadores de relojoaria.',
  },
  191: {
    title: 'Rolex Cellini Moonphase Feminino',
    description:
      'O relógio Rolex Cellini Moonphase é uma obra-prima da relojoaria. Com a complicação de fases da lua, revela o acabamento e a elegância pelos quais a Rolex é reconhecida.',
  },
  192: {
    title: 'Rolex Datejust Feminino',
    description:
      'O Rolex Datejust Feminino é um relógio icônico pensado para as mulheres. Com design atemporal e indicação de data, reúne elegância e funcionalidade.',
  },
  193: {
    title: 'Relógio Feminino Dourado',
    description:
      'O Relógio Feminino Dourado é um acessório deslumbrante, que une luxo e estilo. Com caixa banhada a ouro e design refinado, acrescenta glamour a qualquer produção.',
  },
  194: {
    title: 'Relógio de Pulso Feminino',
    description:
      'O Relógio de Pulso Feminino é versátil e elegante para o uso diário. Com pulseira confortável e design simples e refinado, combina com os mais variados estilos.',
  },
};

/**
 * Devolve o produto com título e descrição já traduzidos.
 * Se não houver tradução cadastrada, devolve o produto original.
 *
 * O operador ?? garante que uma tradução parcial (só o título, por
 * exemplo) não apague a descrição vinda da API.
 */
export function translateProduct(product) {
  if (!product) {
    return product;
  }

  const translation = PRODUCT_TRANSLATIONS[product.id];

  if (!translation) {
    return product;
  }

  return {
    ...product,
    title: translation.title ?? product.title,
    description: translation.description ?? product.description,
  };
}

/**
 * Versão para listas. Aplica a tradução em cada item do array.
 */
export function translateProducts(products) {
  if (!Array.isArray(products)) {
    return [];
  }

  return products.map(translateProduct);
}
