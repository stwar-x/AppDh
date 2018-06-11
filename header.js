import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default class Header extends React.Component {
render() {
    return (
    <View style={styles.header}>
      <TextInput
        value={this.props.value}
        onChangeText = {this.props.onChange}
        onSubmitEditing={this.props.onAddItem}
        placeholde= "What needs to be done?"
        blurOnSubmit= {false}
        returnKeyType= "done"
        style={styles.input}
      />   
    </View>
    );
  }
}
const styles = StyleSheet.create({
    header: {
      //paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "green",
    },
    intput: {
      flex: 1,
      width: "300",
      height: 70

    }
})