function token(state = '', action) {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return '' + action.payload.token;
  case 'SIGNUP_SUCCESS':
    return '' + action.payload.token;
  case 'LOGOUT':
    return '';
  default:
    return state;
  }
}

module.exports = token;
