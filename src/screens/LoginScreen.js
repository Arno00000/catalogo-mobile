// src/screens/LoginScreen.js

import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { login } from '../store/slices/authSlice';
import { colors, fontSize, radius, shadow, spacing } from '../styles/theme';
import { MIN_PASSWORD_LENGTH, validateLoginForm } from '../utils/validation';

// Tempo fingido de "processamento" do login.
// Não é enfeite: sem ele o spinner nem chega a piscar, e o usuário
// não tem confirmação visual de que o toque no botão foi registrado.
const FAKE_REQUEST_DELAY_MS = 600;

/**
 * TELA DE LOGIN
 *
 * Responsabilidades:
 *  - guardar o que está sendo digitado (estado LOCAL, com useState);
 *  - validar quando o usuário toca em Entrar;
 *  - despachar a action de login para o Redux (estado GLOBAL).
 *
 * O que ela NÃO faz, de propósito:
 *  - não chama navigation.navigate. Quem troca de fluxo é o AppNavigator,
 *    reagindo ao isAuthenticated. A tela só avisa "o usuário entrou".
 *  - não contém as regras de validação. Elas moram em utils/validation.js.
 *
 * Não há backend: qualquer e-mail válido com senha de 6+ caracteres autentica.
 */
export default function LoginScreen() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: null, password: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Guardamos o id do setTimeout para poder cancelá-lo se a tela sair do ar
  // antes de o "login" terminar. Sem isso, o React avisaria sobre
  // atualização de estado em componente desmontado.
  const submitTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  // Enquanto o usuário corrige o campo, a mensagem de erro daquele campo
  // some na hora. Deixar o erro fixo até o próximo toque em Entrar
  // passa a sensação de que o app travou.
  function handleChangeEmail(value) {
    setEmail(value);
    if (errors.email) {
      setErrors((previous) => ({ ...previous, email: null }));
    }
  }

  function handleChangePassword(value) {
    setPassword(value);
    if (errors.password) {
      setErrors((previous) => ({ ...previous, password: null }));
    }
  }

  function handleLogin() {
    // Valida o formulário INTEIRO de uma vez, para que os dois campos
    // vazios mostrem suas mensagens juntos.
    const { errors: validationErrors, isValid } = validateLoginForm({ email, password });
    setErrors(validationErrors);

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    submitTimeoutRef.current = setTimeout(() => {
      setIsSubmitting(false);

      // A partir daqui o AppNavigator troca sozinho para o fluxo autenticado.
      dispatch(login({ email }));
    }, FAKE_REQUEST_DELAY_MS);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Sem isto, o teclado cobre o botão Entrar em telas menores. */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>C</Text>
            </View>
            <Text style={styles.title}>Catálogo</Text>
            <Text style={styles.subtitle}>Entre para explorar os produtos da loja</Text>
          </View>

          <View style={styles.form}>
            <FormInput
              label="E-mail"
              placeholder="nome@email.com"
              value={email}
              onChangeText={handleChangeEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
              returnKeyType="next"
              editable={!isSubmitting}
            />

            <FormInput
              label="Senha"
              placeholder={`Mínimo de ${MIN_PASSWORD_LENGTH} caracteres`}
              value={password}
              onChangeText={handleChangePassword}
              error={errors.password}
              secureTextEntry
              autoCapitalize="none"
              textContentType="password"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              editable={!isSubmitting}
            />

            <PrimaryButton title="Entrar" onPress={handleLogin} loading={isSubmitting} />

            <Text style={styles.hint}>
              Login simulado para fins acadêmicos: qualquer e-mail válido funciona.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    // flexGrow (e não flex) permite que o conteúdo centralize quando cabe
    // na tela, mas continue rolando quando o teclado abre.
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    color: colors.textInverse,
    fontSize: 34,
    fontWeight: '800',
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
  hint: {
    marginTop: spacing.md,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
