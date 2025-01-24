import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Header = ({searchQuery, setSearchQuery, cartCount}) => (
  <View style={styles.header}>
    <TextInput
      style={styles.searchBar}
      placeholder="Search product"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
    <View style={styles.iconRow}>
      <TouchableOpacity>
        <Text style={styles.icon}>🛒</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.icon}>🔔</Text>
        <View style={styles.iconAbsolute}>
          <Text style={{fontSize: 12}}>{cartCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontFamily: 'Poppins-Regular',
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 12,
    marginHorizontal: 8,
  },
  iconAbsolute: {
    width: 25,
    height: 25,
    backgroundColor: '#da7772',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    left: 10,
    bottom: 8,
  },
});
