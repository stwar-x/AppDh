import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class row extends React.Component {
render() {
    return (
    <View style={styles.container}>
        <Text style={styles.text}> {this.props.text}</Text>
    </View>
    );
}}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 24,
        color: "#4d4d4d",
    }
})