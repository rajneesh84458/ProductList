// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TextInput,
//   ActivityIndicator,
//   TouchableOpacity,
//   RefreshControl,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchProducts} from '../redux/ProductSlice';

// const ProductScreen = () => {
//   const dispatch = useDispatch();
//   const {products, loading, error} = useSelector(state => state.products);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     setFilteredProducts(
//       products.filter(product =>
//         product.title.toLowerCase().includes(searchQuery.toLowerCase()),
//       ),
//     );
//   }, [products, searchQuery]);

//   const handleSearch = text => {
//     setSearchQuery(text);
//   };

//   const renderProduct = ({item}) => (
//     <TouchableOpacity style={styles.productCard}>
//       <Image source={{uri: item.image}} style={styles.productImage} />
//       <Text style={styles.productTitle} numberOfLines={2}>
//         {item.title}
//       </Text>
//       <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#6200EE" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.loaderContainer}>
//         <Text style={styles.errorText}>
//           Failed to load products. Please try again.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>ShopApp</Text>
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search products..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//         />
//       </View>

//       <FlatList
//         data={filteredProducts}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderProduct}
//         numColumns={2}
//         refreshControl={
//           <RefreshControl
//             refreshing={loading}
//             onRefresh={() => dispatch(fetchProducts())}
//           />
//         }
//         contentContainerStyle={styles.productGrid}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     backgroundColor: '#6200EE',
//     padding: 16,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   searchBar: {
//     marginTop: 8,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 40,
//     width: '100%',
//   },
//   productGrid: {
//     padding: 8,
//   },
//   productCard: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     margin: 8,
//     padding: 8,
//     alignItems: 'center',
//     elevation: 2,
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   productTitle: {
//     marginTop: 8,
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   productPrice: {
//     marginTop: 4,
//     fontSize: 16,
//     color: '#6200EE',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default ProductScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {fetchProducts} from '../redux/ProductSlice';

const PlaceholderCard = () => (
  <ContentLoader
    speed={2}
    width={150}
    height={200}
    viewBox="0 0 150 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <Rect x="25" y="10" rx="8" ry="8" width="100" height="100" />
    <Rect x="10" y="120" rx="4" ry="4" width="130" height="20" />
    <Rect x="35" y="150" rx="4" ry="4" width="80" height="20" />
  </ContentLoader>
);

const App = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector(state => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [products, searchQuery]);

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const renderProduct = ({item}) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const renderPlaceholder = () => (
    <View style={styles.productCard}>
      <PlaceholderCard />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShopApp</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]} // Placeholder items
          keyExtractor={item => item.toString()}
          renderItem={renderPlaceholder}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
        />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Failed to load products. Please try again.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderProduct}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => dispatch(fetchProducts())}
            />
          }
          contentContainerStyle={styles.productGrid}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: '100%',
  },
  productGrid: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    marginTop: 4,
    fontSize: 16,
    color: '#6200EE',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default App;
