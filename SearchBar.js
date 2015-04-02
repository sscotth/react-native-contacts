'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TextInput,
  View,
  Text
} = React;

var SearchBar = React.createClass({
  render: function() {
    return (
      <View style={styles.searchBar}>
        <Text>🔍</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChange={this.props.onSearchChange}
          placeholder="Search"
          onFocus={this.props.onFocus}
          style={styles.searchBarInput}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({

  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
    textAlign: 'center',
    marginLeft: 5
  },

  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  }
  
});

module.exports = SearchBar;
