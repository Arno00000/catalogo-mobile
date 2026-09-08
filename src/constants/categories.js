// src/constants/categories.js

/**
 * Catálogo de categorias do app.
 *
 * `id`    -> é o SLUG REAL da DummyJSON, usado na URL da requisição.
 *            Foi conferido em https://dummyjson.com/products/category-list
 * `label` -> é o texto em português que o usuário vê na tela.
 *
 * Manter os dois juntos aqui evita o erro clássico de traduzir a categoria
 * na tela e depois enviar o texto traduzido para a API.
 */

export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
};

export const MALE_CATEGORIES = [
  { id: 'mens-shirts', label: 'Camisetas' },
  { id: 'mens-shoes', label: 'Calçados' },
  { id: 'mens-watches', label: 'Relógios' },
];

export const FEMALE_CATEGORIES = [
  { id: 'womens-bags', label: 'Bolsas' },
  { id: 'womens-dresses', label: 'Vestidos' },
  { id: 'womens-jewellery', label: 'Joias' },
  { id: 'womens-shoes', label: 'Calçados' },
  { id: 'womens-watches', label: 'Relógios' },
];

/**
 * Devolve a lista de categorias do gênero selecionado.
 * A tela de produtos usa isso para montar os "chips" de categoria
 * sem precisar de nenhum if espalhado pelo componente.
 */
export function getCategoriesByGender(gender) {
  return gender === GENDERS.FEMALE ? FEMALE_CATEGORIES : MALE_CATEGORIES;
}

/**
 * Traduz um slug vindo da API (ex: "womens-bags") para o rótulo em português.
 * Usado na tela de detalhes, onde o produto chega com a categoria em inglês.
 */
export function getCategoryLabel(categoryId) {
  const allCategories = [...MALE_CATEGORIES, ...FEMALE_CATEGORIES];
  const category = allCategories.find((item) => item.id === categoryId);
  return category ? category.label : categoryId;
}
