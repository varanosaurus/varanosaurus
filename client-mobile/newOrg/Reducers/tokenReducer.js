function token(state = null, action) {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
  case 'SIGNUP_SUCCESS':
    return action.payload.token;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
}

module.exports = token;
