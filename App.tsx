import React from 'react';
import { View } from 'react-native';
import Profile from './src/components/Profile';
import styles from './src/components/Style';
import Navbar from './src/components/Navbar';

const App = () => {
  return (
    <View style={styles.container}>
      <Navbar/>
      <Profile />
    </View>
  );
};

export default App;
