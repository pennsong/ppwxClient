let ddpClient = require('./lib/ddpClient');

let FriendsDB = {};

let observer

FriendsDB.subscribeToFriends = () => {
  return ddpClient.subscribe('friends', [])
};

FriendsDB.observeFriends = (cb) => {
  // observer = ddpClient.connection.collections.observe(() => {
  //   return ddpClient.connection.collections.friends.find();
  // });
  //
  // observer.subscribe((results) => {
  //   cb(results);
  // });
  observer = ddpClient.connection.observe('friends',
      ()=>cb(ddpClient.connection.collections.friends.find()),
      ()=>cb(ddpClient.connection.collections.friends.find()),
      ()=>cb(ddpClient.connection.collections.friends.find())
  )
};

FriendsDB.stopObserve = () =>{
  observer.stop()
}
// FriendsDB.getFriends = (userId) => {
//   return new Promise(function (resolve, reject){
//     resolve(ddpClient.connection.collections.friends.find());
//   });
// };

FriendsDB.addNewFriend = (friendName) => {
  return ddpClient.call('Friends.insert', [false, friendName]);
};

FriendsDB.changeFriendVisibility = (friendId, userId) => {
  let mod = {$unset: {userId: true}};

  if (userId) {
    mod = {$set: {userId: userId}};
  }

  return ddpClient.call('Friends.update', [friendId, mod]);
};

FriendsDB.deleteFriend = (friendId) => {
  let todosColl = ddpClient.connection.collections.todos;
  if (todosColl) {
    let todos = todosColl.find();
    for (var i = 0; i < todos.length; i++) {
      ddpClient.call('Todos.remove', [todos[i]._id]);
    }
  }

  return ddpClient.call('Friends.remove', [friendId]);
};

module.exports = FriendsDB;
