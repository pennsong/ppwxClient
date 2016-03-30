import React, {
  AppRegistry,
  Component
} from 'react-native';

import PPRouter from './app/components/PPRouter';

let APP = React.createClass({
  render() {
    return (
      <PPRouter />
    );
  }
});

AppRegistry.registerComponent('ppwxClient', () => APP);