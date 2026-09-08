/**
 * extrair-textos.js
 *
 * Script auxiliar de uso ÚNICO. Não faz parte do aplicativo.
 *
 * Ele consulta as 8 categorias usadas no catálogo e imprime, no
 * terminal, o id, o título e a descrição de cada produto em inglês.
 *
 * Serve para montar o dicionário de tradução em
 * src/utils/productTranslations.js sem precisar abrir a API no navegador
 * e copiar produto por produto.
 *
 * Como usar (na raiz do projeto):
 *
 *   node extrair-textos.js
 *
 * Para salvar em um arquivo:
 *
 *   node extrair-textos.js > textos.txt
 */

const CATEGORIAS = [
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
];

async function extrair() {
  for (const categoria of CATEGORIAS) {
    const resposta = await fetch(`https://dummyjson.com/products/category/${categoria}`);
    const dados = await resposta.json();

    console.log(`\n===== ${categoria} =====`);

    for (const produto of dados.products) {
      console.log(`${produto.id} | ${produto.title}`);
      console.log(`   ${produto.description}`);
    }
  }
}

extrair().catch((erro) => {
  console.log('Erro ao consultar a API:', erro.message);
});
