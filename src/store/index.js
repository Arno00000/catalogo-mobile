// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

/**
 * STORE — o repositório único do estado global.
 *
 * A chave usada aqui ("auth") é o que define o caminho de leitura
 * nos selectors: reducer: { auth: ... }  ->  state.auth.isAuthenticated
 *
 * O configureStore já vem com Redux DevTools e as verificações de
 * imutabilidade/serialização ligadas por padrão. Não precisamos configurar
 * middleware manualmente, e é por isso que não instalamos redux-thunk:
 * ele já está incluído no Redux Toolkit.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
