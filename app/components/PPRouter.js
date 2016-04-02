import React, {AppRegistry, Navigator, StyleSheet, Text, View, Component} from 'react-native'

import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, bindActionCreators, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import NavigationBar from 'react-native-navbar';

import * as reducers from '../reducers';

export {
  router, // the key must be 'router'
};

import {
  reducer as router,
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux'

import SignIn from './SignIn'
import Details from './Details'
import Tabs from './Tabs'

import Accounts from '../config/db/accounts';

import ListsDB from '../config/db/friends';

import ddpClient from '../config/db/lib/ddpClient';

// Polyfill the process functionality needed for minimongo-cache
global.process = require("../config/db/lib/process.polyfill");

const reducer = combineReducers(reducers);

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

const mapStateToProps = state => ({
  router: state.router,
  pics: state.pics,
  user: state.user,
  friends: state.friends
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...routerActions,
  }, dispatch),
  dispatch,
})

const defaultSchema = {
  navBar: NavBar,
  navLeftColor: '#FFFFFF',
  navTint: '#224655',
  navTitleColor: '#FFFFFF',
  navTitleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: 18,
  },
  statusStyle: 'light-content',
  tabBar: TabBar,
}

const leftButtonConfig = {
    title: '取消',
    tintColor: '#00A800',
    handler: () => alert('hello!'),
};

const tabsLeftButtonConfig = {
  title: '退出登录',
  tintColor: '#00A800',
  handler: () => Accounts.signOut().then(()=>{
    console.log('signed out');
    this.props.actions.routes.pop();
  }),
};

const titleConfig = {
  title: 'Hello world',
};

const loginNavBar = ()=><NavigationBar
  leftButton={leftButtonConfig}
  tintColor='#FFFFFF'
/>

const tabsNavBar = ()=><NavigationBar
    leftButton={tabsLeftButtonConfig}
    tintColor='#FFFFFF'
/>

class PPRouter extends Component {
  render() {
     return (
        <Router {...this.props} initial="signIn">
          <Schema name="default" {...defaultSchema} />
          <Route name="signIn" component={SignIn} type="reset" navBar={loginNavBar} />
          <Route name="details" component={Details} />
          <Route name="tabs" component={Tabs} hideNavBar="true"/>
        </Router>
    );
  }
}

let PPRouterC = connect(mapStateToProps, mapDispatchToProps)(PPRouter)

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
       <PPRouterC />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default AppContainer