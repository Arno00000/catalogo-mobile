// src/navigation/AuthNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

/**
 * FLUXO NÃO AUTENTICADO.
 *
 * Hoje tem uma tela só. Ainda assim vale existir como navegador separado:
 * deixa explícito no código que Login pertence a outro fluxo, e um futuro
 * "Esqueci minha senha" ou "Cadastro" entraria aqui sem tocar no resto.
 *
 * headerShown: false porque a tela de login tem o próprio cabeçalho visual
 * (logo + título) e um header nativo em cima ficaria redundante.
 */
export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
