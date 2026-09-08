# 🚀 Como usar este pacote

Este zip contém **o código-fonte** do projeto: a pasta `src/`, o `App.js`, o `README.md` e o `.gitignore`.

Ele **não** contém `package.json`, `app.json`, `babel.config.js`, `assets/` nem `node_modules/`.

## Por quê?

Esses arquivos precisam fixar as versões exatas do Expo SDK e das bibliotecas nativas. Versões erradas são a causa número um de "o projeto não abre no Expo Go". O comando `create-expo-app` gera todos eles corretamente, com as versões compatíveis do momento em que você rodar.

Levam 30 segundos. Siga os passos abaixo.

---

## Passo a passo (5 comandos)

### 1. Crie o projeto base

```bash
npx create-expo-app@latest catalogo-mobile --template blank
cd catalogo-mobile
```

> `--template blank` é importante: garante JavaScript puro. O template padrão vem com TypeScript e Expo Router, que não são usados neste projeto.

### 2. Instale as dependências

```bash
npm install axios @reduxjs/toolkit react-redux
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

> As duas últimas usam `npx expo install` (e não `npm install`) porque têm código nativo. O Expo escolhe automaticamente a versão compatível com o SDK instalado.

### 3. Copie os arquivos deste zip

Para dentro da pasta `catalogo-mobile` que acabou de ser criada:

- `App.js` → **substitua** o arquivo que o template gerou
- `src/` → pasta inteira
- `README.md` → **substitua** o arquivo que o template gerou
- `.gitignore` → **substitua** o arquivo que o template gerou
- `screenshots/` → pasta vazia, para você colocar os prints depois
- `COMO-USAR.md` → pode apagar; serviu só para isso aqui

### 4. Rode

```bash
npx expo start
```

Escaneie o QR Code com o aplicativo **Expo Go** no celular (Android) ou com a **câmera nativa** (iPhone).

### 5. Teste

Entre com qualquer e-mail válido e uma senha de 6 ou mais caracteres. Exemplo:

```
E-mail: aluno@email.com
Senha:  123456
```

O roteiro completo de teste, com 28 passos, está na seção **"Como testar o aplicativo"** do `README.md`.

---

## Se algo der errado

```bash
npx expo start -c
```

A flag `-c` limpa o cache do Metro Bundler e resolve a maioria dos erros estranhos depois de copiar muitos arquivos de uma vez.

Se o celular não encontrar o projeto (Wi-Fi de faculdade, firewall, redes diferentes):

```bash
npx expo start --tunnel
```

A seção **Troubleshooting** do `README.md` tem os outros casos.

---

## Antes de entregar

- [ ] Preencher os dados do autor no fim do `README.md`
- [ ] Substituir `URL_DO_REPOSITORIO` no `README.md`
- [ ] Tirar os prints e salvar em `screenshots/` com os nomes:
      `login.png`, `catalogo-masculino.png`, `catalogo-feminino.png`, `detalhes.png`
- [ ] Criar o repositório **público** no GitHub e dar push
