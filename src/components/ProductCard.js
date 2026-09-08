// src/components/ProductCard.js

import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, shadow, spacing } from '../styles/theme';
import {
  calculateFinalPrice,
  formatDiscount,
  formatPrice,
  hasRelevantDiscount,
} from '../utils/price';

/**
 * CARD DE PRODUTO usado na grade do catálogo.
 *
 * Layout em coluna (imagem em cima, informações embaixo), pensado para
 * uma grade de duas colunas — o formato da referência de design.
 *
 * Componente de apresentação puro: recebe o produto e o que fazer no
 * toque. Não faz requisição, não conhece navegação, não tem estado.
 *
 * PROPRIEDADES DA API (conferidas na resposta real da DummyJSON):
 *   title              -> nome do produto (NÃO existe "name")
 *   thumbnail          -> imagem reduzida (NÃO existe "image")
 *   price              -> preço cheio
 *   discountPercentage -> desconto (NÃO existe "discount")
 */
export default function ProductCard({ product, onPress }) {
  const showDiscount = hasRelevantDiscount(product.discountPercentage);
  const finalPrice = calculateFinalPrice(product.price, product.discountPercentage);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${product.title}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          // "contain" garante que a foto inteira apareça sem cortes,
          // independentemente da proporção que vier da API.
          resizeMode="contain"
        />

        {showDiscount && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{formatDiscount(product.discountPercentage)}</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        {/* numberOfLines evita que um título longo empurre o preço para
            fora do card e desalinhe as duas colunas da grade. */}
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.finalPrice}>{formatPrice(finalPrice)}</Text>

        {showDiscount && (
          <Text style={styles.originalPrice}>{formatPrice(product.price)}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    // flex: 1 faz cada card dividir igualmente a largura disponível na
    // linha da grade, em qualquer tamanho de tela.
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    ...shadow.card,
  },
  cardPressed: {
    opacity: 0.85,
  },
  imageWrapper: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.successLight,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.success,
  },
  info: {
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.sm + spacing.xs,
    paddingBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 18,
    // minHeight reserva o espaço de duas linhas, para que cards com
    // títulos de 1 e de 2 linhas fiquem com o preço na mesma altura.
    minHeight: 36,
  },
  finalPrice: {
    marginTop: spacing.sm,
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  originalPrice: {
    marginTop: 2,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
});
