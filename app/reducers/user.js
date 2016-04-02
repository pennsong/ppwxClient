module.exports = function(state = {}, action){
  switch (action.type) {
  	case 'LOGIN':
  		return {
        username: action.username
      }
      case 'LOGOUT':
          return {}
    default:
      return state
  }
};