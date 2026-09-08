// src/components/FormInput.js

import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '../styles/theme';

/**
 * Campo de formulário: rótulo + input + mensagem de erro.
 *
 * Agrupar os três num componente resolve duas coisas de uma vez:
 *  1. a borda vermelha e a mensagem sempre aparecem juntas (não dá para
 *     esquecer uma das duas);
 *  2. a LoginScreen fica com metade das linhas.
 *
 * O `...rest` repassa qualquer prop nativa do TextInput
 * (secureTextEntry, keyboardType, autoCapitalize, placeholder...),
 * então este componente não precisa conhecer todas elas antecipadamente.
 */
export default function FormInput({ label, error, ...rest }) {
  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, hasError && styles.inputError]}
        placeholderTextColor={colors.disabled}
        // Evita que o teclado do iOS/Android "corrija" e-mails e senhas.
        autoCorrect={false}
        {...rest}
      />

      {/* A mensagem só ocupa espaço quando existe, então o layout
          não fica com um vão vazio embaixo de cada campo. */}
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs + 2,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerLight,
  },
  errorText: {
    marginTop: spacing.xs + 2,
    fontSize: fontSize.xs,
    color: colors.danger,
  },
});
