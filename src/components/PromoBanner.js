// src/components/PromoBanner.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '../styles/theme';

/**
 * FAIXA DE DESTAQUE do topo do catálogo.
 *
 * Elemento puramente visual, presente na referência de design. Recebe
 * o texto por props para não ter conteúdo fixo dentro do componente.
 *
 * Foi feito com Views e cores sólidas em vez de um gradiente, porque
 * gradiente exigiria instalar uma biblioteca adicional — e o projeto
 * tem como regra não adicionar dependências evitáveis.
 */
export default function PromoBanner({ title, subtitle, highlight }) {
  return (
    <View style={styles.banner}>
      {/* Círculos decorativos: dão profundidade ao banner usando
          apenas border-radius, sem imagem e sem biblioteca. */}
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {highlight && (
          <View style={styles.pill}>
            <Text style={styles.pillText}>{highlight}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.md + spacing.xs,
    // overflow hidden mantém os círculos decorativos dentro das bordas
    // arredondadas do banner.
    overflow: 'hidden',
  },
  circleLarge: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    right: -40,
    top: -50,
  },
  circleSmall: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    right: 40,
    bottom: -45,
  },
  content: {
    // maxWidth impede que o texto passe por cima dos círculos
    // decorativos em telas estreitas.
    maxWidth: '78%',
  },
  title: {
    color: colors.textInverse,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: spacing.xs,
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: fontSize.sm,
    lineHeight: 18,
  },
  pill: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  pillText: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: '800',
  },
});
