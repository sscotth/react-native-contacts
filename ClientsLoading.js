'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

var ClientsLoading = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Loading client list...
        </Text>
        <ActivityIndicatorIOS
          size="large"
          style={styles.scrollSpinner}
        />
      </View>
    );
  }

});

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    margin: 10,
    textAlign: 'center'
  },
  scrollSpinner: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

module.exports = ClientsLoading;
