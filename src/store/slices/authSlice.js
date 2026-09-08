// src/store/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

/**
 * SLICE DE AUTENTICAÇÃO
 *
 * Um "slice" no Redux Toolkit junta, em um único arquivo:
 *   - o estado inicial;
 *   - os reducers (funções que alteram o estado);
 *   - as actions (geradas automaticamente a partir dos reducers).
 *
 * Este é o ÚNICO estado global do aplicativo, e isso é uma decisão consciente:
 * "usuário logado" é a única informação que precisa ser lida por partes
 * diferentes do app (a navegação decide o fluxo, a tela de produtos
 * mostra o nome). Todo o resto é estado local com useState.
 */

/**
 * Gera um nome de exibição a partir do e-mail digitado.
 * Como o login é simulado (não existe backend devolvendo o perfil),
 * derivamos algo amigável: "maria.silva@email.com" -> "Maria silva".
 */
function buildDisplayName(email) {
  const localPart = String(email || '').split('@')[0];

  if (!localPart) {
    return 'Usuário';
  }

  const cleaned = localPart.replace(/[._-]+/g, ' ').trim();

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

const initialState = {
  user: null,             // { name, email } quando autenticado
  isAuthenticated: false, // é este campo que a navegação observa
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Chamado pela LoginScreen depois que a validação passa.
     *
     * O "state.user = ..." parece mutação, mas o Redux Toolkit usa
     * a biblioteca Immer por baixo: ele intercepta essa escrita e produz
     * um novo estado imutável. É por isso que não precisamos de spread aqui.
     */
    login(state, action) {
      const email = String(action.payload?.email || '').trim();

      state.user = {
        name: buildDisplayName(email),
        email,
      };
      state.isAuthenticated = true;
    },

    /**
     * Limpa TODO o estado do usuário.
     * Voltar aos valores de initialState é o que garante que nenhum dado
     * do usuário anterior sobreviva ao logout.
     */
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Actions usadas com dispatch(): dispatch(login({ email })) e dispatch(logout())
export const { login, logout } = authSlice.actions;

/**
 * Selectors.
 * Em vez de escrever useSelector((state) => state.auth.user) espalhado
 * pelo projeto, cada componente importa o selector pronto.
 * Se um dia a forma do estado mudar, muda só aqui.
 */
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// O reducer é o que será registrado na store.
export default authSlice.reducer;
