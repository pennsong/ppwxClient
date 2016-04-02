module.exports = function(state = [], action){
  switch (action.type) {
  	case 'friends.GET_ALL':
  		return action.friends
    default:
      return state;
  }
};