'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

var ClientRow = React.createClass({
  render: function() {

    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: this.props.thumbnail
          }}
          style={styles.thumbnail}
        />
        <Text style={styles.name}>
          {this.props.fullName}
        </Text>
        <Text style={styles.infoIcon}>
          {'info'}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },

  thumbnail: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 25
  },

  name: {
    flex: 2,
    fontSize: 24
  },

  infoIcon: {
    flex: 0
  }
  
});



module.exports = ClientRow;
