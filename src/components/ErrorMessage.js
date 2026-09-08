// src/components/ErrorMessage.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PrimaryButton from './PrimaryButton';
import { colors, fontSize, radius, spacing } from '../styles/theme';

/**
 * Estado de ERRO.
 *
 * Regra do projeto: o usuário NUNCA vê a mensagem técnica da API
 * ("Request failed with status code 404", "Network Error"). Essas ficam
 * apenas no console, para depuração. Aqui entra sempre um texto em
 * português que explica o que aconteceu e o que fazer.
 *
 * O botão "Tentar novamente" só aparece se a tela passar um onRetry.
 * Oferecer retry sem ter o que refazer seria enganar o usuário.
 */
export default function ErrorMessage({
  message = 'Não foi possível carregar os dados. Tente novamente.',
  onRetry,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>!</Text>
      </View>

      <Text style={styles.title}>Algo deu errado</Text>
      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <View style={styles.buttonWrapper}>
          <PrimaryButton title="Tentar novamente" onPress={onRetry} variant="outline" />
        </View>
      )}
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
    backgroundColor: colors.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.danger,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonWrapper: {
    marginTop: spacing.lg,
    alignSelf: 'stretch',
    paddingHorizontal: spacing.xl,
  },
});
