// src/components/CategoryChips.js

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colors, fontSize, radius, spacing } from '../styles/theme';

/**
 * SELETOR HORIZONTAL DE CATEGORIAS.
 *
 * Por que ScrollView + map aqui, se o projeto usa FlatList na lista
 * de produtos?
 *
 * A recomendação de usar FlatList existe por causa da VIRTUALIZAÇÃO:
 * renderizar só o que aparece na tela. Isso importa em listas grandes e
 * imprevisíveis, como a de produtos vinda da API.
 *
 * Aqui são no máximo 5 itens, fixos, definidos em constants/categories.
 * Virtualizar 5 chips não traz ganho e deixaria o código mais verboso.
 * Usar a ferramenta certa para cada caso é a boa prática — não usar
 * FlatList em tudo por reflexo.
 */
export default function CategoryChips({ categories, selectedCategoryId, onSelectCategory }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => {
        const isSelected = category.id === selectedCategoryId;

        return (
          <Pressable
            key={category.id}
            onPress={() => onSelectCategory(category.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={({ pressed }) => [
              styles.chip,
              isSelected && styles.chipSelected,
              pressed && styles.chipPressed,
            ]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  chip: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipPressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  labelSelected: {
    color: colors.textInverse,
    fontWeight: '700',
  },
});
