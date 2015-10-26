function appReducer(state, action) {

  if (state == null) {
    state = {
      token: null,
      uiMode: {
        entryMode: 'login',
      },
    };
  }

  switch (action.type) {
  case 'SET_ENTRY_MODE':
    return Object.assign(
        {},
        state,
        {uiMode: {entryMode: action.payload.mode}}
      );
  case 'LOGIN_SUCCESS':
  case 'SIGNUP_SUCCESS':
    return Object.assign(
        {},
        state,
        {
          token: action.payload.token,
          data: {
            user: action.payload.user,
            household: action.payload.household,
          },
        }
      );
  }

  return state;
}

/*
  compose({
      token: tokenReducer
      user: userReducer
    });

  tokenReducer(state = null, action) {
    switch (action.type) {
      case loginsuccess:
      case signupsuccess:
        return action.payload.token
    }
  }

  userReducer(state = {}, action) {
    switch (action.type) {
      case loginsuccess:
      case signupsuccess:
        return Object.assign({}, state, action.payload.user)
    }
  }
*/

module.exports = appReducer;
