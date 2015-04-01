'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} = React;

var API_URL = 'http://api.randomuser.me/?results=100';

var AwesomeProject = React.createClass({

  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  },

  componentDidMount: function () {
    this.fetchData();
  },

  fetchData: function () {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.results),
          loaded: true
        })
      })
      .done();
  },

  renderLoadingView: function () {
    return (
      <View style={styles.container}>
        <Text>
          Loading client list...
        </Text>
      </View>
    );
  },

  renderClientRow: function (data) {
    var client = data.user;

    return (
      <View style={styles.container}>
        <Image
          source={{uri: client.picture.thumbnail}}
          style={styles.thumbnail}
        />
        <Text style={styles.name}>
          {this.capitalizeString(client.name.first)} {this.capitalizeString(client.name.last)}
        </Text>
        <Text style={styles.infoIcon}>
          {'info'}
        </Text>
      </View>
    );
  },

  capitalizeString: function (s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  },

  render: function () {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderClientRow}
        style={styles.listView}
      />
    )
  }
});

var styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },

  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },

  name: {
    flex: 2,
    fontSize: 24
  },

  infoIcon: {
    flex: 0
  },
  
  thumbnail: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 25
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
