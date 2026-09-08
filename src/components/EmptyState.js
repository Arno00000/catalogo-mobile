// src/components/EmptyState.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '../styles/theme';

/**
 * Estado de LISTA VAZIA.
 *
 * Diferente do erro: aqui a requisição funcionou, só não veio produto.
 * Misturar os dois casos confunde o usuário — ele tentaria "de novo"
 * uma busca que já deu certo.
 *
 * Esse cenário é real neste projeto: algumas categorias da DummyJSON têm
 * poucos itens, e a API pode devolver uma lista vazia sem erro nenhum.
 */
export default function EmptyState({ message = 'Nenhum item encontrado.' }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>◇</Text>
      </View>
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
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
  message: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
