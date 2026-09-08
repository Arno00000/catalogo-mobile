// src/utils/validation.js

/**
 * Validação do formulário de login.
 *
 * Feita com JavaScript puro, sem Formik / Yup / React Hook Form,
 * conforme exigido no enunciado.
 *
 * Cada função devolve:
 *  - uma STRING com a mensagem de erro, quando o campo está inválido;
 *  - NULL, quando o campo está válido.
 *
 * Esse padrão deixa a tela muito simples: ela só pergunta
 * "veio mensagem?" e mostra embaixo do campo.
 */

// Regex intencionalmente simples: algo + @ + algo + . + 2 letras ou mais.
// Validar e-mail "de verdade" é um problema muito maior do que este projeto pede.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MIN_PASSWORD_LENGTH = 6;

export function validateEmail(email) {
  const value = String(email || '').trim();

  if (!value) {
    return 'Informe seu e-mail.';
  }

  if (!EMAIL_REGEX.test(value)) {
    return 'Digite um e-mail válido. Exemplo: nome@email.com';
  }

  return null;
}

export function validatePassword(password) {
  const value = String(password || '');

  if (!value) {
    return 'Informe sua senha.';
  }

  if (value.length < MIN_PASSWORD_LENGTH) {
    return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  return null;
}

/**
 * Valida o formulário inteiro de uma vez.
 * É o que permite que, ao tocar em "Entrar" com os campos vazios,
 * as DUAS mensagens apareçam juntas — e não uma de cada vez.
 */
export function validateLoginForm({ email, password }) {
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  const isValid = !errors.email && !errors.password;

  return { errors, isValid };
}
