// src/navigation/MainNavigator.js

import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import { logout } from '../store/slices/authSlice';
import { colors, fontSize, radius, spacing } from '../styles/theme';

const Stack = createNativeStackNavigator();

/**
 * Botão de Logout exibido no canto direito do cabeçalho do catálogo.
 *
 * Ele fica aqui (e não dentro da ProductsScreen) porque é um elemento
 * da NAVEGAÇÃO, não do conteúdo da tela. Assim a ProductsScreen cuida
 * só de produtos.
 *
 * Ao despachar logout(), o isAuthenticated vira false; o AppNavigator
 * percebe a mudança e troca o fluxo inteiro. Repare que NÃO existe
 * navigation.navigate('Login') aqui: a navegação é consequência do estado.
 */
function LogoutButton() {
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => dispatch(logout())}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Sair da conta"
      style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutButtonPressed]}
    >
      <Text style={styles.logoutLabel}>Sair</Text>
    </Pressable>
  );
}

/**
 * FLUXO AUTENTICADO.
 *
 * Duas telas empilhadas:
 *   Products  ->  ProductDetails
 *
 * A native-stack já entrega de graça o cabeçalho, o botão de voltar
 * e o gesto de arrastar para trás no iOS. Por isso não instalamos
 * nenhuma biblioteca extra de UI para o header.
 *
 * As opções comuns ficam em screenOptions (aplicadas a todas as telas)
 * e só o que é específico de cada tela fica em options.
 */
export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
        headerShadowVisible: false,
        // contentStyle define o fundo da área de conteúdo de todas as telas,
        // evitando repetir backgroundColor no container de cada uma.
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          title: 'Catálogo',
          headerRight: () => <LogoutButton />,
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Detalhes do produto' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
  },
  logoutButtonPressed: {
    opacity: 0.6,
  },
  logoutLabel: {
    color: colors.primaryDark,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
});
