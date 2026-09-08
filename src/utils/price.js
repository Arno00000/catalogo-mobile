// src/utils/price.js

/**
 * Regras de preço do catálogo.
 *
 * São funções puras: recebem números e devolvem valores.
 * Não conhecem React, não conhecem a API e não têm estado.
 * Por isso podem ser usadas tanto no card da lista quanto na tela de
 * detalhes, garantindo que o mesmo produto nunca mostre preços
 * diferentes em telas diferentes.
 *
 * O símbolo da moeda fica em uma constante única: trocar a exibição do
 * app inteiro é alterar apenas a linha abaixo.
 */

const CURRENCY_SYMBOL = 'R$';

/**
 * Aplica o desconto percentual sobre o preço cheio.
 * Fórmula: preço final = preço - (preço × desconto / 100)
 */
export function calculateFinalPrice(price, discountPercentage) {
  const safePrice = Number(price) || 0;
  const safeDiscount = Number(discountPercentage) || 0;

  return safePrice - (safePrice * safeDiscount) / 100;
}

/**
 * Formata um número no padrão brasileiro: ponto para milhar e
 * vírgula para os centavos. Ex: 1299.9 -> "R$ 1.299,90"
 */
export function formatPrice(value) {
  const safeValue = Number(value) || 0;

  const [inteiro, centavos] = safeValue.toFixed(2).split('.');
  const inteiroComPonto = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${CURRENCY_SYMBOL} ${inteiroComPonto},${centavos}`;
}

/**
 * A API devolve descontos quebrados (ex: 15.35).
 * Arredondar deixa o selo do card muito mais legível: "15% OFF".
 */
export function formatDiscount(discountPercentage) {
  const safeDiscount = Number(discountPercentage) || 0;

  return `${Math.round(safeDiscount)}% OFF`;
}

/**
 * Só vale mostrar o preço riscado se o desconto for relevante.
 * A API tem produtos com 0,94% de desconto — riscar o preço por causa
 * de menos de 1% seria propaganda enganosa na interface.
 */
export function hasRelevantDiscount(discountPercentage) {
  return (Number(discountPercentage) || 0) >= 1;
}
