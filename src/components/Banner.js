import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Banner = () => (
  <View style={styles.banner}>
    <Text style={styles.bannerText}>A Summer Surprise</Text>
    <Text style={styles.bannerSubtext}>Cashback 20%</Text>
  </View>
);

export default Banner;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#483298',
    padding: 16,
    margin: 8,
    borderRadius: 8,
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
  },
  bannerSubtext: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
});
