// src/screens/ProductDetailsScreen.js

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import PrimaryButton from '../components/PrimaryButton';
import { getCategoryLabel } from '../constants/categories';
import { getProductById } from '../services/productsService';
import { colors, fontSize, radius, shadow, spacing } from '../styles/theme';
import {
  calculateFinalPrice,
  formatDiscount,
  formatPrice,
  hasRelevantDiscount,
} from '../utils/price';

const ERROR_MESSAGE =
  'Não foi possível carregar os detalhes deste produto. Tente novamente.';

/**
 * TELA DE DETALHES DO PRODUTO.
 *
 * COMO O ID CHEGA AQUI:
 * a ProductsScreen chama navigation.navigate('ProductDetails', { productId }).
 * O React Navigation entrega isso em route.params, e é de lá que lemos o ID.
 *
 * Com o ID em mãos, buscamos o produto completo em /products/{id}.
 * A tela repete o mesmo tratamento de estados do catálogo: loading, erro
 * com retry e sucesso — coerência de experiência entre as telas.
 */
export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  /**
   * Busca os detalhes sempre que a tela recebe um novo ID de produto.
   * O productId nas dependências é o que garante que, se a mesma tela for
   * reaproveitada para outro produto, os dados sejam recarregados.
   */
  useEffect(() => {
    let isActive = true;

    async function loadProduct() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProductById(productId);

        if (isActive) {
          setProduct(data);
        }
      } catch (requestError) {
        console.log('Falha ao buscar o produto:', requestError?.message);

        if (isActive) {
          setProduct(null);
          setError(ERROR_MESSAGE);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isActive = false;
    };
  }, [productId, reloadToken]);

  /**
   * Atualiza o título do cabeçalho nativo assim que o produto chega.
   * useLayoutEffect (e não useEffect) porque a alteração é visual e deve
   * ocorrer antes da pintura da tela, evitando um "pisca" no título.
   */
  useLayoutEffect(() => {
    if (product?.title) {
      navigation.setOptions({ title: product.title });
    }
  }, [navigation, product]);

  function handleRetry() {
    setReloadToken((previous) => previous + 1);
  }

  if (isLoading) {
    return <Loading message="Carregando detalhes..." />;
  }

  if (error || !product) {
    return <ErrorMessage message={ERROR_MESSAGE} onRetry={handleRetry} />;
  }

  // A API traz um array `images` e também um `thumbnail`.
  // Preferimos a primeira imagem em alta; o thumbnail é o plano B
  // caso o array venha vazio em algum produto.
  const imageUrl = product.images?.[0] ?? product.thumbnail;

  const showDiscount = hasRelevantDiscount(product.discountPercentage);
  const finalPrice = calculateFinalPrice(product.price, product.discountPercentage);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.card}>
        <Text style={styles.category}>{getCategoryLabel(product.category)}</Text>
        <Text style={styles.title}>{product.title}</Text>

        {product.brand && <Text style={styles.brand}>Marca: {product.brand}</Text>}

        <View style={styles.priceBlock}>
          <Text style={styles.finalPrice}>{formatPrice(finalPrice)}</Text>

          {showDiscount && (
            <View style={styles.discountRow}>
              <Text style={styles.originalPrice}>{formatPrice(product.price)}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {formatDiscount(product.discountPercentage)}
                </Text>
              </View>
            </View>
          )}

          {showDiscount && (
            <Text style={styles.savings}>
              Você economiza {formatPrice(product.price - finalPrice)}
            </Text>
          )}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Avaliação</Text>
          <Text style={styles.metaValue}>{Number(product.rating ?? 0).toFixed(1)} / 5</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Estoque</Text>
          <Text style={styles.metaValue}>{product.stock ?? 0} unidades</Text>
        </View>
      </View>

      {/* O cabeçalho nativo já traz o botão voltar. Este botão extra existe
          porque, após rolar uma descrição longa, o topo da tela fica distante. */}
      <View style={styles.backButtonWrapper}>
        <PrimaryButton
          title="Voltar ao catálogo"
          variant="outline"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  imageWrapper: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  image: {
    // Largura relativa em vez de fixa: a imagem se adapta ao tamanho do
    // aparelho sem estourar as bordas da tela.
    width: '100%',
    height: 280,
  },
  card: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
  category: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    marginTop: spacing.xs,
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 26,
  },
  brand: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  priceBlock: {
    marginTop: spacing.md,
  },
  finalPrice: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  originalPrice: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.successLight,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: colors.success,
  },
  savings: {
    marginTop: spacing.xs,
    fontSize: fontSize.xs,
    color: colors.success,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  metaLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  metaValue: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  backButtonWrapper: {
    marginTop: spacing.lg,
  },
});
