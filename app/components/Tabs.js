'use strict';

import React, { Component, StyleSheet, Text, View, ScrollView } from 'react-native';

import Accounts from '../config/db/accounts';

var ScrollableTabView = require('react-native-scrollable-tab-view');

import Friends from './Friends'

import ddpClient from '../config/db/lib/ddpClient';

import { connect } from 'react-redux';

import FriendsDB from '../config/db/friends';

class Tabs extends Component {
    constructor(props){
        super(props)
    }

    logout(){
        this.props.dispatch({
            type: 'LOGOUT'
        })
        FriendsDB.stopObserve()
        this.props.actions.pop()
        console.log('poped')
        Accounts.signOut().then(()=>{
            console.log("pp out")
            ddpClient.close()
        })
    }

    componentWillMount(){
        FriendsDB.subscribeToFriends()
        .then(
            ()=>{
                FriendsDB.observeFriends((results)=>{
                    this.props.dispatch({
                        type: 'friends.GET_ALL',
                        friends: results
                    })
                })
            }
        )
    }

    componentWillUnmount(){
        //unsubscribe & unobserve
        console.log('unmount')
       // FriendsDB.stopObserve()
    }

  render() {
    return (
        <ScrollableTabView tabBarPosition="bottom">
            <ScrollView tabLabel="ios1" style={styles.tabView}>
                <View style={styles.card}>
                    <Text>News</Text>
                </View>
            </ScrollView>
            <ScrollView tabLabel="person" style={styles.tabView}>
                <View style={styles.card}>
                    <Friends friends={this.props.friends} />
                </View>
            </ScrollView>
            <ScrollView tabLabel="ios2" style={styles.tabView}>
                <View style={styles.card}>
                    <Text>Messenger</Text>
                </View>
            </ScrollView>
            <ScrollView tabLabel="ios3" style={styles.tabView}>
                <View style={styles.card}>
                    <Text>Notifications</Text>
                </View>
            </ScrollView>
            <ScrollView tabLabel="navicon" style={styles.tabView}>
                <View style={styles.card}>
                    <Text onPress={()=>this.logout()}>Logout</Text>
                </View>
            </ScrollView>
        </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        //height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});

const mapStateToProps = state => ({
    pics: state.pics,
    user: state.user,
    friends: state.friends
});

let TabsC = connect(mapStateToProps)(Tabs)

export default TabsC