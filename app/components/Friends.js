'use strict';

import React, { Component, StyleSheet, Text, View, ListView, Image } from 'react-native';

export default class Friends extends Component {
    constructor(props) {
        super(props); 
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.ds = this.ds.cloneWithRows(props.friends)
    }

    renderFriend(item){
        return (
            <Friend 
              name={item.username1} 
              thumbnail={item.friendLogo1} 
            />
        )
    }

    componentWillReceiveProps(nextProps){
      this.ds = this.ds.cloneWithRows(nextProps.friends)
    }

    render() {
        console.log('rendering friends')
      return (
        <ListView
          dataSource={this.ds}
          renderRow={this.renderFriend.bind(this)}
          style={styles.listView}
        />
      );
    }
}

const Friend = ({name, thumbnail})=>{
    return(
        <View>
            <Image style={styles.thumbnail} source={{uri: thumbnail}} />
            <Text>{name}</Text>
        </View>
    )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: 53,
        height: 81,
    }
});