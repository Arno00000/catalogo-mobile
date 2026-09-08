// src/services/productsService.js

import api from './api';
import { translateProduct, translateProducts } from '../utils/productTranslations';

/**
 * SERVIÇO DE PRODUTOS.
 *
 * Camada que traduz "o que o app precisa" em "chamada HTTP".
 * As telas pedem `getProductsByCategory('mens-shoes')` e recebem um
 * array pronto — elas não sabem qual é a URL nem qual é o formato bruto
 * da resposta.
 *
 * Detalhe importante da DummyJSON, verificado na API real:
 * o endpoint de categoria NÃO devolve um array direto. Ele devolve um
 * envelope de paginação:
 *
 *   { "products": [ ... ], "total": 5, "skip": 0, "limit": 5 }
 *
 * Já o endpoint por ID devolve o objeto do produto direto.
 * É aqui — e só aqui — que esse "desembrulho" acontece.
 *
 * A localização para português também é aplicada neste ponto, logo após
 * receber a resposta. Assim as telas recebem os dados já prontos para
 * exibição e não precisam saber que a API responde em inglês.
 *
 * Repare que NÃO existe try/catch aqui. É proposital: o serviço deixa o
 * erro subir para quem chamou. Quem sabe o que mostrar na tela é a tela,
 * não o serviço.
 */

/**
 * Busca todos os produtos de uma categoria.
 * @param {string} categorySlug slug da API (ex: 'mens-shirts')
 * @returns {Promise<Array>} lista de produtos traduzidos
 */
export async function getProductsByCategory(categorySlug) {
  const response = await api.get(`/products/category/${categorySlug}`);

  // O optional chaining protege contra uma resposta inesperada:
  // em vez de quebrar a FlatList com undefined, devolvemos [] e a tela
  // exibe o estado de "nenhum produto encontrado".
  return translateProducts(response.data?.products ?? []);
}

/**
 * Busca um único produto pelo ID.
 * Usado pela tela de detalhes, que recebe o ID como parâmetro de rota.
 * @param {number|string} productId
 * @returns {Promise<Object>} objeto do produto traduzido
 */
export async function getProductById(productId) {
  const response = await api.get(`/products/${productId}`);

  return translateProduct(response.data);
}
