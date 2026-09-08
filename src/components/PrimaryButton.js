// src/components/PrimaryButton.js

import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontSize, radius, spacing } from '../styles/theme';

/**
 * Botão padrão do aplicativo.
 *
 * Existe para que "Entrar", "Tentar novamente" e "Voltar ao catálogo"
 * tenham exatamente a mesma altura, o mesmo raio e o mesmo feedback de toque,
 * sem copiar e colar StyleSheet em três telas diferentes.
 *
 * Props:
 *  - title     : texto do botão
 *  - onPress   : ação
 *  - loading   : troca o texto por um spinner e bloqueia o toque
 *  - disabled  : bloqueia o toque
 *  - variant   : 'primary' (preenchido) ou 'outline' (contornado)
 *
 * Usamos Pressable (e não TouchableOpacity) porque ele expõe o estado
 * `pressed`, permitindo o feedback visual sem animação manual.
 */
export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
}) {
  const isOutline = variant === 'outline';
  const isBlocked = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isBlocked}
      accessibilityRole="button"
      accessibilityState={{ disabled: isBlocked, busy: loading }}
      style={({ pressed }) => [
        styles.button,
        isOutline ? styles.buttonOutline : styles.buttonPrimary,
        isBlocked && styles.buttonBlocked,
        pressed && !isBlocked && styles.buttonPressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.textInverse} />
      ) : (
        <Text style={[styles.label, isOutline ? styles.labelOutline : styles.labelPrimary]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // minHeight em vez de height fixo: se o usuário estiver com a fonte
    // do sistema aumentada, o botão cresce em vez de cortar o texto.
    minHeight: 52,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonBlocked: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  labelPrimary: {
    color: colors.textInverse,
  },
  labelOutline: {
    color: colors.primary,
  },
});
