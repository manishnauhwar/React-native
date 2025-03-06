import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>Crud Operations</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  navbar: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    padding: 10 ,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
})


export default Navbar;