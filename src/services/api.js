// src/services/api.js

import axios from 'axios';

/**
 * INSTÂNCIA ÚNICA DO AXIOS.
 *
 * Este é o único arquivo do projeto que conhece o endereço da API.
 * Nenhuma tela ou componente escreve "https://dummyjson.com".
 *
 * Vantagens práticas dessa centralização:
 *  - trocar de ambiente (produção/homologação) é editar uma linha;
 *  - o timeout vale para TODAS as requisições automaticamente.
 *
 * Sobre o timeout: ele não é detalhe. Sem ele, uma rede ruim deixa o
 * ActivityIndicator girando indefinidamente e o app parece travado.
 * Com 10 segundos, a requisição falha, cai no catch da tela e o usuário
 * vê a mensagem amigável com o botão "Tentar novamente".
 */
const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export default api;
