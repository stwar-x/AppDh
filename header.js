import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
export default class Header extends React.Component {
render() {
    return (
    <View style={styles.header}>
      <TouchableOpacity onPress={this.props.onToggleAllComplete}>
        <Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, padding: 10 }}>
        <TextInput
          value={this.props.value}
          onChangeText = {this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          placeholder= "What needs to be done?"
          blurOnSubmit= {false}
          returnKeyType= "done"
          style={styles.input}
          autoFocus={true}
          underlineColorAndroid="transparent"
        />    
      </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#eff0f1",
  },
  toggleIcon: {
    fontSize: 30,
    color: "#CCC"
  },
  intput: {
    flex: 1,
    marginLeft: 16,
    width: "300",
    height: 70,
    paddingBottom: 5,
    borderWidth: 0
  }
})
