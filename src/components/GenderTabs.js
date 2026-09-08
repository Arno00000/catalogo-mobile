// src/components/GenderTabs.js

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GENDERS } from '../constants/categories';
import { colors, fontSize, radius, spacing } from '../styles/theme';

const TABS = [
  { id: GENDERS.MALE, label: 'Masculino' },
  { id: GENDERS.FEMALE, label: 'Feminino' },
];

/**
 * ABAS MASCULINO / FEMININO.
 *
 * DECISÃO DE ARQUITETURA (vale explicar na apresentação):
 * este é um componente de abas próprio, e não um Tab Navigator.
 *
 * Motivos:
 *  1. Zero dependências novas. Um bottom-tabs seria +1 pacote; um
 *     material-top-tabs seria +3 (tab-view e pager-view incluídos).
 *  2. A hierarquia do catálogo é gênero -> categoria. Com Tab Navigator
 *     eu teria duas telas duplicando a mesma lógica de busca.
 *     Com estado local, uma ProductsScreen resolve os dois níveis.
 *  3. Este componente é "burro" de propósito: não guarda estado, só
 *     recebe o gênero selecionado e avisa quando o usuário toca.
 */
export default function GenderTabs({ selectedGender, onSelectGender }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isSelected = tab.id === selectedGender;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onSelectGender(tab.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            style={({ pressed }) => [
              styles.tab,
              isSelected && styles.tabSelected,
              pressed && styles.tabPressed,
            ]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    padding: 4,
  },
  tab: {
    // flex: 1 nas duas abas garante que elas dividam a largura igualmente
    // em qualquer tamanho de tela, sem largura fixa em pixels.
    flex: 1,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  tabSelected: {
    backgroundColor: colors.surface,
  },
  tabPressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  labelSelected: {
    color: colors.primary,
    fontWeight: '800',
  },
});
