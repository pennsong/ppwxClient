'use strict';

import React, { Component, StyleSheet, Text, View } from 'react-native';

export default class Detail extends Component {
  render() {
    console.log("rending details")
    const { actions } = this.props;

    return (
      <View style={styles.container}>
        <Text onPress={actions.pop}>Go back!</Text>
        <Text onPress={actions.routes.details()}>Go deep!</Text>
        <Text onPress={this.props.login}>dispatch!</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
});
