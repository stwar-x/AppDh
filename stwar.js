import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from "./header";
import Footer from "./footer";
export default class App extends React.Component {
render() {
    return (
    <View style={styles.container}>
        <Header />
        <View style={styles.content } >
            
        </View>
        <Footer />
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "red"
    },
    content :{
      flex: 1
    }
})