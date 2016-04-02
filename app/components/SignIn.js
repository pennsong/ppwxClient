'use strict';

import React, { Component, StyleSheet, Text, View, TextInput } from 'react-native'
import NavigationBar from 'react-native-navbar'
import Button from 'react-native-button'
import ddpClient from '../config/db/lib/ddpClient';
import Accounts from '../config/db/accounts';
import FriendsDB from '../config/db/friends';

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.username;
        this.password;
    }

  _handlePress(username, password){
     ddpClient.initialize()
      .then(() => {
        return Accounts.signIn(username, password);
      })
      .then(() => {
         this.props.dispatch({
            type: 'LOGIN',
            username: username
          })
      })
      .then(
         ()=>FriendsDB.subscribeToFriends()
      )
      .then(
          ()=>FriendsDB.observeFriends((results)=>{
            this.props.dispatch({
              type: 'friends.GET_ALL',
              friends: results
            })
          })
      ).then(
         ()=> this.props.actions.routes.tabs()()
     )
      .catch((err) => {
        console.log('login err:', err)
      })
  }

  // //todo autologin with u1
  // componentWillMount(){
  //   this._handlePress('u1', '123456')
  // }

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

  render() {
    console.log("rendering singin")
    const { actions, login } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>使用帐号和密码登录</Text>
        <View style={styles.row}>
          <Text style={styles.label}>帐号</Text>
          <TextInput style={styles.input} onChangeText={(text)=>this.username=text} placeholder="微信号/邮箱地址/QQ号" />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>密码</Text>
          <TextInput style={styles.input} onChangeText={(text)=>this.password=text} placeholder="请填写密码" />
        </View>
        <Button
          containerStyle={styles.loginButtonContainer}
          style={styles.loginButton}
          styleDisabled={{color: 'red'}}
          onPress={()=>this._handlePress(this.username, this.password)}
        >
          登录
        </Button>
        <Text style={styles.link}>登录遇到问题?</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'flex-start',
  },
  title:{
    fontSize: 28,
    height: 80
  },
  row:{
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1
  },
  label:{
    fontSize: 20,
    width: 80
  },
  input:{
    height: 40, 
    width: 240
  },
  loginButtonContainer:{
    marginTop: 20,
    padding:10,
    height:45,
    width: 320, 
    overflow:'hidden', 
    borderRadius:4, 
    backgroundColor: '#6AD968'
  },
  loginButton:{
    fontSize: 20, 
    color: '#A5E8A4'
  },
  link:{
    marginTop: 20,
    fontSize: 15, 
    color: '#4C6492'
  }
});
