// src/components/Loading.js

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '../styles/theme';

/**
 * Estado de CARREGAMENTO.
 *
 * Componente separado porque as duas telas que fazem requisição
 * (catálogo e detalhes) precisam exatamente do mesmo visual enquanto esperam.
 *
 * O ActivityIndicator é o spinner nativo do React Native — não precisamos
 * de nenhuma biblioteca de animação para isso.
 */
export default function Loading({ message = 'Carregando...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  message: {
    marginTop: spacing.md,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
