import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../redux/ProductSlice';
import {addToCart} from '../redux/cartSlice';
import {toggleFavorite} from '../redux/favouriteSlice';
import ProductPlaceholder from '../components/ProductPlaceholder';
import Banner from '../components/Banner';
import Header from '../components/Header';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const {products, loading, error, page, hasMore} = useSelector(
    state => state.products,
  );
  const cart = useSelector(state => state.cart);
  const favorites = useSelector(state => state.favorites);

  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts({page: 1, limit: itemsPerPage}));
  }, [dispatch]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToCart = product => {
    dispatch(addToCart(product));
  };

  const handleToggleFavorite = productId => {
    dispatch(toggleFavorite(productId));
  };

  const renderProduct = ({item}) => {
    const isFavorite = favorites.includes(item.id);
    return (
      <View style={styles.productCard}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => handleAddToCart(item)}>
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleToggleFavorite(item.id)}>
            <Text
              style={[
                styles.heartIcon,
                isFavorite ? styles.heartActive : null,
              ]}>
              ♥
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts({page: page + 1, limit: itemsPerPage}));
    }
  };

  const renderPlaceholders = ({item}) => (
    <View style={styles.productCard}>
      <ProductPlaceholder />
    </View>
  );

  const renderListFooter = () =>
    loading && <ActivityIndicator size={30} color="#483298" />;

  return (
    <View style={styles.container}>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cart.length}
      />

      <Banner />

      <Text style={styles.sectionTitle}>Popular Products</Text>

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]} // Placeholder data
          keyExtractor={item => `placeholder_${item}`} // Unique keys for placeholders
          renderItem={renderPlaceholders}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
        />
      ) : error ? (
        <Text style={styles.errorText}>Failed to load products</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => `product_${item.id}`} // Unique keys for products
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderListFooter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  productGrid: {
    paddingHorizontal: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    margin: 8,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    // elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginVertical: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#6200EE',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cartButton: {
    backgroundColor: '#483298',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  cartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  heartIcon: {
    fontSize: 16,
    color: '#999',
  },
  heartActive: {
    color: '#da7772',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});
export default ProductScreen;
