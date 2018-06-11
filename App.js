import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from "./header";
import Footer from "./footer";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      allComplete: false,
      value: "",
      items: []
      }
      this.handleAddItem = this.handleAddItem.bind(this);
      this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    }
    handleToggleAllComplete() {
      const complete = !this.state.allComplete;
      const newItems = this.state.items.map((item) =>({
        ...item,
        complete
      }))
      console.table(newItems);
      this.setState({
        items: newItems,
        allComplete: complete
       })
    }
    handleAddItem() {
      if(!this.state.value) return
      const newItems = [
        ...this.state.items,
        {
          key: Date.now(),
          text: this.state.value,
          complete: false
        }
      ]
      this.setState({
        items: newItems,
        value:""
      })
    }
  
  render() {
    return (
    <View style={styles.container}>
        <Header 
        value={this.state.container}
        onAddItem={this.handleAddItem}
        onChange={(value) => this.setState({ value })}
        onToggleAllComplete={this.handleToggleAllComplete} 
        />
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
      backgroundColor: "orange",
      paddingTop: 50
    },
    content: {
      flex: 1
    }
})