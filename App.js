import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ListView,
  Keyboard,
  AsyncStorage,
  Picker,
} from 'react-native';
import Header from './header';
import Footer from './footer';
import Row from './row';
import moment from 'moment';

const filterItems = (filter, items) => {
  return items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'COMPLETED') return item.complete;
    if (filter === 'ACTIVE') return !item.complete;
  });
};

const now = moment(new Date()).startOf('day');
const datos = [
  {
    key: 0,
    date: moment('2018-07-07'),
    events: [
      {
        key: 1,
        text: '1 instalar las carpas',
        complete: false,
        time: moment('2018-07-07 07:00'),
      },
      {
        key: 2,
        text: '2 instalar el sonido',
        complete: false,
        time: moment('2018-07-07 07:30'),
      },
      {
        key: 3,
        text: '3 instalar las cintas',
        complete: false,
        time: moment('2018-07-07 13:00'),
      },
    ],
  },
  {
    key: 1,
    date: moment('2018-12-20'),
    events: [
      {
        key: 1,
        text: 'next day instalar las carpas',
        complete: false,
        time: moment('2018-12-20 07:00'),
      },
      {
        key: 2,
        text: 'next day instalar el sonido',
        complete: false,
        time: moment('2018-12-20 07:30'),
      },
      {
        key: 3,
        text: 'next day instalar las cintas',
        complete: false,
        time: moment('2018-12-20 08:00'),
      },
    ],
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      loading: true,
      allComplete: false,
      filter: 'ALL',
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([]),
      day: 0,
    };
    this.handleUpDateText = this.handleUpDateText.bind(this);
    this.handleToggleEditing = this.handleToggleEditing.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.setSource = this.setSource.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
    this.renderDay = this.renderDay.bind(this);
    this.changeDays = this.changeDays.bind(this);
  }
  async componentWillMount() {
    for(let i = 0; i < datos.length; i++){
      if (datos[i].date.diff(now, 'days') >= 0) {
        let json = await AsyncStorage.getItem(datos[i].date.format('DD-MM-YYYY') + 'items')
        try {
          const items = JSON.parse(json);

          if (items === null) {
            await AsyncStorage.setItem(datos[i].date.format('DD-MM-YYYY') + 'items', JSON.stringify(datos[i].events)
            );
          }
        } catch (e) {
          this.setState({
            loading: false,
          });
        }
      }
    }

    let json = await AsyncStorage.getItem(datos[this.state.day].date.format('DD-MM-YYYY') + 'items');
    try {
      const items = JSON.parse(json);
      console.log('itemsitemsitems', items);
      this.setSource(items, items, { loading: false });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  }

  handleUpDateText(key, text) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item;
      return {
        ...item,
        text,
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }
  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item;
      return {
        ...item,
        editing,
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }
  /*************
   * setSource
   *************/
  setSource(items, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState,
    });
    AsyncStorage.setItem(datos[this.state.day].date.format('DD-MM-YYYY') + 'items', JSON.stringify(items));
  }
  handleClearComplete() {
    const newItems = filterItems('ACTIVE', this.state.items);
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }
  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), {
      filter,
    });
  }
  handleRemoveItem(key) {
    const newItems = this.state.items.filter(item => {
      return item.key !== key;
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }
  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete,
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }
  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ...item,
      complete,
    }));
    this.setSource(newItems, filterItems(this.state.filter, newItems), {
      allComplete: complete,
    });
  }
  handleAddItem() {
    if (!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false,
      },
    ];
    this.setSource(newItems, filterItems(this.state.filter, newItems), {
      value: '',
    });
  }
  renderDay(option) {
    return (
      <Picker.Item
        key={option.key}
        label={option.date.format('DD-MM-YYYY')}
        value={option.key}
      />
    );
  }
  async changeDays(itemValue) {
    console.log('itemValue',itemValue,'fecha',datos[itemValue].date.format('DD-MM-YYYY') + 'items');
    let json = await AsyncStorage.getItem(datos[itemValue].date.format('DD-MM-YYYY') + 'items');
    try {
      const items = JSON.parse(json);
      if (items !== null) {
        this.setSource(items, items, { day: itemValue });
      }
    } catch (e) {
      console.log('error', e.message);
    }
  }
  render() {
    const notToday =
      now.diff(datos[this.state.day].date.startOf('day'), 'days') !== 0;
    return (
      <View style={styles.container}>
        {1 === 3 && (
          <Header
            value={this.state.value}
            onAddItem={this.handleAddItem}
            onChange={value => this.setState({ value })}
            onToggleAllComplete={this.handleToggleAllComplete}
            notToday={notToday}
          />
        )}
        <Picker
          selectedValue={this.state.day}
          style={styles.picker}
          onValueChange={this.changeDays}
        >
          {datos.map(d => {
            return this.renderDay(d);
          })}
        </Picker>
        <View style={styles.content}>
          {notToday && <View style={styles.notToday} />}
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value }) => {
              return (
                <Row
                  key={key}
                  onUpdate={text => this.handleUpdateText(key, text)}
                  onToggleEdit={editing =>
                    this.handleToggleEditing(key, editing)
                  }
                  onRemove={() => this.handleRemoveItem(key)}
                  onComplete={complete =>
                    this.handleToggleComplete(key, complete)
                  }
                  {...value}
                />
              );
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator} />;
            }}
          />
        </View>
        <Footer
          count={filterItems('ACTIVE', this.state.items).length}
          onFilter={this.handleFilter}
          filter={this.state.filter}
          onClearComplete={this.handleClearComplete}
          notToday={notToday}
        />
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator animating size="large" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    paddingTop: 25,
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  content: {
    flex: 1,
  },
  list: {
    backgroundColor: '#FFF',
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  picker: {
    height: 50,
    alignSelf: 'stretch',
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
