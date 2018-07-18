import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import moment from 'moment';

const now = moment(`${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm')}`);

export default class row extends React.Component {
  constructor(props) {
    super(props);
    this.speak = this.speak.bind(this);
  }
  speak() {
    if (moment(this.props.time).diff(now) < 0) {
      if (this.props.complete) {
        Expo.Speech.speak(this.props.speach, { language: 'es-419' });
      } else {
        Expo.Speech.speak(this.props.speach, { language: 'es-419' });
      }
    } else {
      Expo.Speech.speak(this.props.speach, { language: 'es-419' })
    }
  }
  render() {
    const { complete } = this.props;
    const pastUncompleted = moment(this.props.time).diff(now) < 0 && !complete;
    const past = moment(this.props.time).diff(now) < 0 && complete;

    const textComponent = (
      <TouchableOpacity
        style={[
          styles.textWrap,
          past && styles.past,
          pastUncompleted && styles.pastUncompleted
          ]}
        onPress={this.speak}
        onLongPress={this.speak}>
        <Text style={[
          moment(this.props.time).diff(now) > 0 && styles.text,
          complete && styles.complete,
          pastUncompleted && styles.pastUncompletedColor
        ]}>
          {this.props.text}
        </Text>
        <Text style={[styles.time, pastUncompleted && styles.pastUncompletedColor]}>
          {moment(this.props.time).format('hh:mm a')}
        </Text>
      </TouchableOpacity>
    );

    const removeButtom = (
      <TouchableOpacity onPress={this.props.onRemove}>
        <Text style={styles.destroy}>X</Text>
      </TouchableOpacity>
    );

    const editingComponent = (
      <View style={styles.textWrap}>
        <TextInput
          onChangeText={this.props.onUpdate}
          autoFocus
          value={this.props.text}
          style={styles.input}
          multiline
        />
      </View>
    );

    const doneButton = (
      <TouchableOpacity
        style={styles.done}
        onPress={() => this.props.onToggleEdit(false)}>
        <Text style={styles.doneText}>Save</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Switch value={complete} onValueChange={this.props.onComplete} />
        {this.props.editing ? editingComponent : textComponent}
        {/* {this.props.editing ? doneButton : removeButtom} */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 12,
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: '#4d4d4d',
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7be290',
    padding: 7,
  },
  doneText: {
    color: '#4d4d4d',
    fontSize: 20,
  },
  complete: {
    textDecorationLine: 'line-through',
  },
  past: {
    backgroundColor: '#48823f6e',
    borderRadius: 5,
    padding: 5,
    fontSize: 18
  },
  text: {
    fontSize: 24,
    color: '#4d4d4d',
  },
  past: {
    backgroundColor: '#48823f6e',
    borderRadius: 5,
    padding: 5,
  },
  pastUncompleted: {
    backgroundColor: '#ca1a2fd4',
    borderRadius: 5,
    padding: 5
  },
  pastUncompletedColor: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  destroy: {
    fontSize: 20,
    color: '#cc9a9a',
  },
});
