// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { selectIsAuthenticated } from '../store/slices/authSlice';

/**
 * NAVEGADOR RAIZ — o "porteiro" do aplicativo.
 *
 * Esta é a peça mais importante da arquitetura de navegação, e é o padrão
 * de rotas protegidas recomendado pela documentação do React Navigation.
 *
 * Como funciona:
 *  - lê isAuthenticated da store com useSelector;
 *  - se for false, SÓ o AuthNavigator existe na árvore;
 *  - se for true, SÓ o MainNavigator existe na árvore.
 *
 * Por que isso é melhor do que chamar navigation.navigate('Login') no logout:
 * as telas autenticadas não ficam "escondidas atrás" do login — elas são
 * DESMONTADAS. Não existe botão voltar, gesto ou deep link capaz de
 * devolver o usuário ao catálogo depois do logout, porque aquela pilha
 * deixou de existir. É segurança de fluxo garantida pela estrutura, não por
 * um if espalhado nas telas.
 *
 * O NavigationContainer fica por fora dos dois porque é ele quem guarda o
 * estado da navegação — precisa existir independentemente do fluxo exibido.
 */
export default function AppNavigator() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
