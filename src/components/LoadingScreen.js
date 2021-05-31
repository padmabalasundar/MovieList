import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';


const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(21,21,21)',
      }}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text style={{ color: 'white', alignSelf: 'center' }}>Fetching movie details...</Text>
    </View>
  );
};

export default LoadingScreen;
