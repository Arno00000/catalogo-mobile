// src/styles/theme.js

/**
 * Tokens visuais do aplicativo (cores, espaçamentos, tipografia, raios).
 *
 * Paleta inspirada na referência de design do projeto: fundo claro,
 * cartões brancos arredondados e um roxo como cor de destaque.
 *
 * Por que este arquivo existe:
 * nenhuma tela ou componente escreve um "#6C4DF6" ou um "16" solto.
 * Todos importam daqui. Trocar a identidade visual do app é editar
 * UM arquivo, sem tocar em nenhuma tela.
 */

export const colors = {
  // Marca
  primary: '#6C4DF6',
  primaryDark: '#4A2FD1',
  primaryLight: '#EDE8FF',

  // Superfícies
  background: '#F4F5F7',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F0F5',
  border: '#ECECF1',

  // Texto
  textPrimary: '#1A1A25',
  textSecondary: '#8E8EA0',
  textInverse: '#FFFFFF',

  // Estados
  danger: '#E5484D',
  dangerLight: '#FDEDEE',
  success: '#2E9E5B',
  successLight: '#E6F6EC',
  disabled: '#B9B9C6',
};

// Escala de espaçamento em múltiplos de 4.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 19,
  xl: 26,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  pill: 999,
};

/**
 * Sombra de card.
 * React Native usa APIs diferentes por plataforma: shadow* no iOS e
 * elevation no Android. Declarando as duas aqui, os componentes só
 * espalham `...shadow.card` e não precisam saber disso.
 */
export const shadow = {
  card: {
    shadowColor: '#1A1A25',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
};
