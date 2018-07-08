import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Footer extends Component {
  render() {
    const { filter } = this.props;
    return (
      <View style={styles.container}>
        {this.props.notToday && <View style={styles.notToday} />}
        {/*<Text>{this.props.count} count</Text>*/}
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filter, filter === 'ALL' && styles.selected]}
            onPress={() => this.props.onFilter('ALL')}>
            <Text style={filter === 'ALL' && styles.textSelected}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter === 'ACTIVE' && styles.selected]}
            onPress={() => this.props.onFilter('ACTIVE')}>
            <Text style={filter === 'ACTIVE' && styles.textSelected}>Sin hacer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter === 'COMPLETED' && styles.selected]}
            onPress={() => this.props.onFilter('COMPLETED')}>
            <Text style={filter === 'COMPLETED' && styles.textSelected}>Hechos</Text>
          </TouchableOpacity>
        </View>
        {1 === 3 && (
          <TouchableOpacity onPress={this.props.onClearComplete}>
            <Text>Clear Completed</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eae8e8d9',
  },
  filters: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  filter: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5
  },
  selected: {
    backgroundColor: '#9ed666d9',
    borderRadius: 2
  },
  textSelected: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  notToday: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#f4f7fe',
    opacity: 0.5,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 5,
  },
});
export default Footer;
