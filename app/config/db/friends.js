let ddpClient = require('./lib/ddpClient');

let FriendsDB = {};

FriendsDB.subscribeToFriends = () => {
  return ddpClient.subscribe('friends', [])
};

FriendsDB.observeFriends = (cb) => {
  let observer = ddpClient.connection.collections.observe(() => {
    return ddpClient.connection.collections.friends.find();
  });

  observer.subscribe((results) => {
    cb(results);
  });
};

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
