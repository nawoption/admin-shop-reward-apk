import {StyleSheet, Text, View, ActivityIndicator, Dimensions} from 'react-native';
import React from 'react';

export default function loading() {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingCard}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  loadingCard: {
    width: 120,
    height: 110,
    backgroundColor: '#00BCD4',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius:5
  },
  loadingText: {
    color: '#ffff',
    fontSize: 20,
  },
});
