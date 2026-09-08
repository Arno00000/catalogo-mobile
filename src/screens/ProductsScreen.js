// src/screens/ProductsScreen.js

import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import CategoryChips from '../components/CategoryChips';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import GenderTabs from '../components/GenderTabs';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/PromoBanner';
import { GENDERS, getCategoriesByGender, getCategoryLabel } from '../constants/categories';
import { getProductsByCategory } from '../services/productsService';
import { selectUser } from '../store/slices/authSlice';
import { colors, fontSize, spacing } from '../styles/theme';

const ERROR_MESSAGE =
  'Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.';

/**
 * TELA PRINCIPAL — CATÁLOGO.
 *
 * Concentra dois estados de interface e três de requisição:
 *   selectedGender / selectedCategoryId  -> o que o usuário escolheu
 *   products / isLoading / error         -> o resultado da chamada à API
 *
 * Nenhum deles vai para o Redux, e isso é proposital: são dados que só
 * existem enquanto esta tela está aberta. Estado global aqui seria
 * complexidade sem benefício. O único dado global que a tela lê é o
 * usuário logado, para a saudação.
 */
export default function ProductsScreen({ navigation }) {
  const user = useSelector(selectUser);

  const [selectedGender, setSelectedGender] = useState(GENDERS.MALE);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    getCategoriesByGender(GENDERS.MALE)[0].id,
  );

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Contador usado apenas para forçar o useEffect a rodar de novo quando
  // o usuário toca em "Tentar novamente".
  const [reloadToken, setReloadToken] = useState(0);

  const categories = getCategoriesByGender(selectedGender);

  /**
   * Busca os produtos sempre que a categoria muda (ou quando o usuário
   * pede para tentar novamente).
   *
   * A flag `isActive` resolve um problema real de app mobile: se o
   * usuário troca de categoria rapidamente, a resposta da requisição
   * ANTIGA pode chegar depois da nova e sobrescrever a lista correta. No
   * cleanup do efeito marcamos a requisição anterior como obsoleta, e o
   * resultado dela é descartado.
   */
  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProductsByCategory(selectedCategoryId);

        if (isActive) {
          setProducts(data);
        }
      } catch (requestError) {
        // O erro técnico fica no console, para depuração.
        // O usuário recebe apenas a mensagem amigável.
        console.log('Falha ao buscar produtos:', requestError?.message);

        if (isActive) {
          setProducts([]);
          setError(ERROR_MESSAGE);
        }
      } finally {
        // finally garante que o indicador some mesmo quando dá erro.
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [selectedCategoryId, reloadToken]);

  /**
   * Ao trocar de gênero, a categoria selecionada precisa ser reiniciada.
   * Sem isso, ao ir de Masculino para Feminino o app continuaria
   * buscando "mens-shirts" estando na aba Feminino.
   */
  function handleSelectGender(gender) {
    if (gender === selectedGender) {
      return;
    }

    setSelectedGender(gender);
    setSelectedCategoryId(getCategoriesByGender(gender)[0].id);
  }

  function handleRetry() {
    setReloadToken((previous) => previous + 1);
  }

  /**
   * Navega para os detalhes enviando APENAS o ID do produto.
   *
   * Poderíamos passar o objeto inteiro e economizar uma requisição, mas
   * o enunciado pede navegação por ID e busca em /products/{id} — e essa
   * é a abordagem correta: parâmetros de rota devem ser leves, e a tela
   * de destino busca a versão mais completa do dado.
   *
   * O nome 'ProductDetails' precisa ser idêntico ao registrado no
   * MainNavigator, e a chave 'productId' idêntica à lida em route.params.
   */
  function handleOpenProduct(productId) {
    navigation.navigate('ProductDetails', { productId });
  }

  function renderContent() {
    // A ordem destes ifs importa: carregando > erro > vazio > lista.
    if (isLoading) {
      return <Loading message="Carregando produtos..." />;
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={handleRetry} />;
    }

    if (products.length === 0) {
      return <EmptyState message="Nenhum produto encontrado nesta categoria." />;
    }

    return (
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        // numColumns transforma a lista em uma grade. O columnWrapperStyle
        // é o que cria o espaçamento horizontal entre os dois cards.
        numColumns={2}
        columnWrapperStyle={styles.column}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => handleOpenProduct(item.id)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>{getCategoryLabel(selectedCategoryId)}</Text>
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {user?.name ?? 'visitante'}</Text>
        <Text style={styles.subtitle}>Encontre o que combina com você</Text>

        <View style={styles.bannerWrapper}>
          <PromoBanner
            title="Descontos de até 20%"
            subtitle="Aproveite as ofertas selecionadas do catálogo"
            highlight="OFERTAS DA SEMANA"
          />
        </View>

        <View style={styles.tabsWrapper}>
          <GenderTabs selectedGender={selectedGender} onSelectGender={handleSelectGender} />
        </View>

        <CategoryChips
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
      </View>

      {/* O cabeçalho fica fixo e só a área abaixo troca entre
          loading / erro / vazio / grade. Assim o usuário nunca perde
          o acesso às abas enquanto os produtos carregam. */}
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 2,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  bannerWrapper: {
    marginTop: spacing.md,
  },
  tabsWrapper: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  column: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
});
