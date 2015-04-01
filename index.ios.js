'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var ClientList = require('./ClientList');

var AwesomeProject = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Clients',
          component: ClientList,
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

module.exports = AwesomeProject;
