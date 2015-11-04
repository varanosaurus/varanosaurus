function token(state = '', action) {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return '' + action.payload.token;
  case 'SIGNUP_SUCCESS':
    return '' + action.payload.token;
  case 'LOGOUT':
    return '';
  case 'ADD_HOUSEHOLD_SUCCESS':
    return '' + action.payload.token;
  case 'UPDATE_INVITATION_SUCCESS':
    return '' + action.payload.token;
  case 'LEAVE_HOUSEHOLD_SUCCESS':
    return action.payload.token;
  default:
    return state;
  }
}

module.exports = token;
