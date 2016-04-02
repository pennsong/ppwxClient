'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import ddpClient from '../config/db/lib/ddpClient';

const Master = (backgroundColor = '#F5FCFF') => class extends Component {
  render() {
    console.log("rendering master")
    const { actions, assets } = this.props;
    //console.log(this.props)
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableHighlight>
          <Text>{this.props.friends.length}</Text>
        </TouchableHighlight>
        <Text style={styles.text} onPress={actions.routes.details()}>Push detail view!!</Text>
        <Text style={styles.text} onPress={()=>{console.dir(ddpClient.connection.collections)}}>{this.props.friends.length}</Text>
      </View>
    );
  }
}

export default Master

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 200,
  },
  text: {
    color: '#FFF',
  },
});
