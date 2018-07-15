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
const rigthNow = moment(`${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm')}`);
const datos = [
  {
    key: 0,
    date: moment('2018-07-14'),
    label: 'Pre-Carrera',
    events: [
      {
        key: 1,
        text: '1 Si salio de la casa !!',
        complete: false,
        time: moment('2018-07-14 06:00'),
        speach: 'Levantese imbecil'
      },
      {
        key: 2,
        text: '2 Llego o esta en camino',
        complete: false,
        time: moment('2018-07-14 06:30'),
        speach: 'Gonorrea ome gonorrea ome'
      },
      {
        key: 3,
        text: '3 Llamada a lista',
        complete: false,
        time: moment('2018-07-14 07:00'),
        speach: 'Donde esta agüevado?'
      },
      {
        key: 4,
        text: '4 Asignación de tareas',
        complete: false,
        time: moment('2018-07-14 07:10'),
        speach: 'Ya sabe lo q tiene q hacer'
      },
      {
        key: 5,
        text: '5 Instalar carpas',
        complete: false,
        time: moment('2018-07-14 07:30'),
        speach: 'No se demore'
      },
      {
        key: 6,
        text: '6 Instalar sonido',
        complete: false,
        time: moment('2018-07-14 07:50'),
        speach: 'Pongalo a traquiar'
      },
      {
        key: 7,
        text: '7 Testiar sonido ',
        complete: false,
        time: moment('2018-07-14 08:00'),
        speach: 'Si suena bien'
      },
      {
        key: 8,
        text: '8 Revisar cinta',
        complete: false,
        time: moment('2018-07-14 08:30'),
        speach: 'Alguna novedad'
      },
      {
        key: 9,
        text: '9 Verificar sonido',
        complete: false,
        time: moment('2018-07-14 09:00'),
        speach: 'Candela candela'
      },
      {
        key: 10,
        text: '10 Que le falta',
        complete: false,
        time: moment('2018-07-14 09:30'),
        speach: 'Agilice agüevado'
      },
      {
        key: 11,
        text: '11 Ya esta listo',
        complete: false,
        time: moment('2018-07-14 09:45'),
        speach: 'En la trampa'
      },
      {
        key: 12,
        text: '12 Listo pa la carrera',
        complete: false,
        time: moment('2018-07-14 09:50'),
        speach: 'Enfoquese'
      },{
        key: 13,
        text: '13 Se fue',
        complete: false,
        time: moment('2018-07-14 09:55'),
        speach: 'Candela candela'
      },{
        key: 14,
        text: '14 Primer lanzamiento Damas',
        complete: false,
        time: moment('2018-07-14 10:00'),
        speach: 'Suelte suelte'
      },{
        key: 15,
        text: '15 Primer lanzamiento Senior',
        complete: false,
        time: moment('2018-07-14 10:30'),
        speach: 'Sueltele Sueltele'
      },
      {
        key: 16,
        text: '16 Primer lanzamiento Master',
        complete: false,
        time: moment('2018-07-14 11:00'),
        speach: 'Sueltele sueltele'
      },
      {
        key: 17,
        text: '17 Primer lanzamiento Elite',
        complete: false,
        time: moment('2018-07-14 11:30'),
        speach: 'Candela candela'
      },
      {
        key: 18,
        text: '18 Almorzar',
        complete: false,
        time: moment('2018-07-14 12:00'),
        speach: 'Prendalo'
      },
      {
        key: 19,
        text: '19 Se dejo venir',
        complete: false,
        time: moment('2018-07-14 12:50'),
        speach: 'Se dejo venir'
      },
      {
        key: 20,
        text: '20 Segundo lanzamiento Damas',
        complete: false,
        time: moment('2018-07-14 13:00'),
        speach: 'Sueltele sueltele'
      },
      {
        key: 21,
        text: '21 Segundo lanzamiento Senior',
        complete: false,
        time: moment('2018-07-14 13:30'),
        speach: 'Sueltele sueltele'
      },
      {
        key: 22,
        text: '22 Segundo lanzamiento Master',
        complete: false,
        time: moment('2018-07-14 14:00'),
        speach: 'Candela candela'
      },
      {
        key: 23,
        text: '23 Segundo lanzamiento Elite',
        complete: false,
        time: moment('2018-07-14 14:30'),
        speach: 'Candela candela'
      },
      {
        key: 24,
        text: '24 Premiacion Base 1',
        complete: false,
        time: moment('2018-07-14 15:00'),
        speach: 'Felicitaciones'
      },
      {
        key: 25,
        text: '25 Recoger Base 2 y Base 3',
        complete: false,
        time: moment('2018-07-14 15:00'),
        speach: 'Recoja sus maricadas'
      },
      {
        key: 26,
        text: '26 Recoger todo Base 1',
        complete: false,
        time: moment('2018-07-14 16:00'),
        speach: 'Recoja todo'
      },
      {
        key: 27,
        text: '27 Ya acabo?',
        complete: false,
        time: moment('2018-07-14 16:30'),
        speach: 'Vamos vamos'
      },
      {
        key: 28,
        text: '28 Vamonos vamonos',
        complete: false,
        time: moment('2018-07-14 09:00'),
        speach: 'Se acabo la fiesta Agüevado'
      },
    ],
  },
  {
    key: 1,
    date: moment('2018-12-20'),
    label: 'Dia de la Carrera',
    events: [
      {
        key: 1,
        text: 'next day instalar las carpas',
        complete: false,
        time: moment('2018-12-20 07:00'),
        speach: 'Oe Pirobo'
      },
      {
        key: 2,
        text: 'next day instalar el sonido',
        complete: false,
        time: moment('2018-12-20 07:30'),
        speach: 'Gonorrea ome gonorrea ome'
      },
      {
        key: 3,
        text: 'next day instalar las cintas',
        complete: false,
        time: moment('2018-12-20 08:00'),
        speach: 'Ya termino?'
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
    this.alertIfRemoteNotificationsDisabledAsync();

    for(let i = 0; i < datos.length; i++){
      if (datos[i].date.diff(now, 'days') >= 0) {
        try {
          let json = await AsyncStorage.getItem(datos[i].date.format('DD-MM-YYYY') + 'items')
          let items = JSON.parse(json);
          if (items === null) {
            await AsyncStorage.setItem(datos[i].date.format('DD-MM-YYYY') + 'items', JSON.stringify(datos[i].events));
          }
          items = datos[i].events;
          for (let j = 0; j < items.length; j++) {
            if (moment(items[j].time).diff(rigthNow) > 0) {
              await Expo.Notifications.scheduleLocalNotificationAsync({
                title: items[j].text,
                body: items[j].speach,
                android: {
                  icon: 'http://static.wixstatic.com/media/2e5bc5_5f3d634ff4eb43c1998cf0b767f6a5b9~mv2.png/v1/fill/w_1024,h_1024,al_c,usm_0.66_1.00_0.01/2e5bc5_5f3d634ff4eb43c1998cf0b767f6a5b9~mv2.png',
                  vibrate: true,
                  sound: true,
                  priority: 'high'
                }
              }, {
                time: parseInt(moment(items[j].time).format('x')),
                repeat: 'year'
              });
            }
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
      this.setSource(items, items, { loading: false });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  }

  async alertIfRemoteNotificationsDisabledAsync() {
    const { Permissions } = Expo;
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
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
        label={option.label}
        value={option.key}
      />
    );
  }
  async changeDays(itemValue) {
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
    color: '#fff'
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
