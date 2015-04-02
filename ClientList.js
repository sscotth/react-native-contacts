'use strict';

var React = require('react-native');
var fuzzy = require('fuzzysearch');
var _ = require('lodash');

var {
  StyleSheet,
  View,
  ListView
} = React;

var API_URL = 'http://api.randomuser.me/?results=100';

var ClientsLoading = require('./ClientsLoading');
var SearchBar = require('./SearchBar');
var ClientRow = require('./ClientRow');

var ClientList = React.createClass({

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
          rawData: data.results,
          dataSource: toListViewDataSource(data.results),
          loaded: true
        })
      })
      .done();
  },

  filterData: function (query: string) {

    var filteredData = _.filter(this.state.rawData, function (client) {
      var firstAndLastName = client.user.name.first + ' ' + client.user.name.last;

      return fuzzy(query, firstAndLastName);
    });

    this.setState({dataSource: toListViewDataSource(filteredData)});
  },

  toListViewDataSource: function (array) {
    return this.state.dataSource.cloneWithRows(array);
  },

  renderLoadingView: function () {
    return (
      <ClientsLoading />
    );
  },

  renderClientRow: function (data) {
    var client = data.user;

    var fullName = capitalizeString(client.name.first) + ' ' + capitalizeString(client.name.last);

    return (
      <ClientRow
        fullName={fullName}
        thumbnail={client.picture.thumbnail}
      />
    );
  },

  onSearchChange: function (event: Object) {
    var query = event.nativeEvent.text.toLowerCase();

    this.filterData(query);
  },

  render: function () {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <SearchBar
          onFocus={() => this.refs.listview.getScrollResponder().scrollTo(0, 0)}
          onSearchChange={this.onSearchChange}
        />
        <View style={styles.separator} />
        <ListView
          ref="listview"
          dataSource={this.state.dataSource}
          renderRow={this.renderClientRow}
          style={styles.listView}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    )
  }
});

var styles = StyleSheet.create({

  container: {
    flex: 1
  },

  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },

  listView: {
    backgroundColor: '#F5FCFF'
  }

});

module.exports = ClientList;

function capitalizeString(s) {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}
