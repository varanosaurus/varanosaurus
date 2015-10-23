//USERS
'User Model': {
  id: integer,
  username: string,
  updatedAt: date,
  createdAt: date,
  householdId: integer,
}

{
  'sign up a user': {
    verb: 'POST',
    url: '/auth/signup',
    requestBody: {
      username: string,
      password: string,
    },
    responseBody: {
      user: User
      token: token,
    },
  },

  'get a user\'s info': {
    verb: 'GET',
    url: '/api/users/:userId',
    requestBody: null,
    responseBody: User
  },

  'change a user\'s info': {
    verb: 'PUT',
    url: '/api/users/:userId',
    requestBody: {
      password: string, //optional
      householdId: integer, //optional
    },
    responseBody: {
      updates: {
        householdId: integer, //only if included in request
      },
      token: token, //included since the household may have changed
    }
  },

  'delete a user': {
    verb: 'DELETE',
    url: '/api/users/:userId',
    requestBody: null,
    responseBody: {
      success: boolean,
      deletedUserId: id,
    }
  }
}

//HOUSEHOLDS
'Household Model': {
  id: integer,
  name: string,
  updatedAt: date,
  createdAt: date,
  creatorId: integer,
  captainId: integer,
}

{
  'add a household': {
    verb: 'POST',
    url: '/api/households/',
    requestBody: {
      name: string,
    },
    responseBody: {
      household: Household,
      token: token,
    },
  },

  'get a household\'s info': {
    verb: 'GET',
    url: '/api/households/:householdId',
    requestBody: null,
    responseBody: {
      household: Household,
      users: {
        user1accountName: integer, //integer will be the userId
        user2accountName: integer, //etc
      }
    }
  },

  'change a household\'s info': {
    verb: 'PUT',
    url: '/api/households/:householdId',
    requestBody: {
      name: string, //optional
      captainId: integer, //optional
    },
    responseBody: {
      updates: {
        name: string, //only if included in request
        captainId: integer, //only if included in request
        updatedAt: date,
      },
      token: token,
    }
  },

  'delete a household': {
    verb: 'DELETE',
    url: '/api/households/:householdId',
    requestBody: null,
    responseBody: {
      success: boolean,
      deletedHouseholdId: id,
    }
  }
}

//ITEMS
'Item Model': {
  description: string,
  details: string,
  fetch: boolean,
  bought: boolean,
  price: stringified decimal,
  timeFetched: date,
  timeBought: date,
  id: integer,
  createdAt: date,
  updatedAt: date,
  householdId: integer,
  addingUserId: integer,
  fetchingUserId: integer,
  buyingUserId: integer,
  reckoningId: integer,
}

{
  'get all items of a household': {
    verb: 'GET',
    url: 'api/items',
    requestBody: null,
    responseBody: [Item],
  },

  'add an item': {
    verb: 'POST',
    url: '/api/items',
    requestBody: {
      description: string,
      details: string, //optional
      fetch: boolean, //optional, defaults to false
      bought: boolean, //optional, defaults to false
      price: stringified decimal, //optional, defaults to 0
    },
    responseBody: Item,
  },

  'get an item\'s info': {
    verb: 'GET',
    url: '/api/items/:itemId',
    requestBody: null,
    responseBody: Item
  },

  'change an item\'s info': {
    verb: 'PUT',
    url: '/api/items/:itemId',
    requestBody: {
      details: string, //optional
      fetch: boolean, //optional
      bought: boolean, //optional
      price: stringified decimal, //optional
      fetchingUserId: integer, //optional
      buyingUserId: number, //optional
    },
    responseBody: {
      updates: {
        details: string, //only if included in request
        fetch: boolean, //only if included in request
        bought: boolean, //only if included in request
        price: stringified decimal, //only if included in request
        fetchingUserId: integer, //only if included in request
        buyingUserId: number, //only if included in request,
      },
    },
  },

  'delete an item': {
    verb: 'DELETE',
    url: '/api/items/:itemId',
    requestBody: null,
    responseBody: {
      success: boolean,
      deletedItemId: id,
    }
  }
}

//RECKONINGS
'Reckoning Model': {
  totalSpent: stringified decimal,
  date: date,
  id: integer,
  createdAt: date,
  updatedAt: date,
  householdId: integer,
}

{
  'get all reckonings of a household': {
    verb: 'GET',
    url: '/api/reckonings',
    requestBody: null,
    responseBody: [Reckoning],
  },
  //we didn't talk about having support for this in MVP,
  //but for testing it made sense to have this feature available
  //so it's included here and we can decide later if it's post-MVP or not
  'initiate a reckoning': {
    verb: 'POST',
    url: '/api/reckonings',
    requestBody: null,
    responseBody: Reckoning,
  },

  'get a reckoning\'s info': {
    verb: 'GET',
    url: '/api/reckonings/:reckoningId',
    requestBody: null,
    responseBody: Reckoning,
  },
}

//INVITATIONS
'Invitation Model': {
  seen: boolean,
  seenAt: date,
  id: int,
  createdAt: date,
  updatedAt: date,
  fromUserId: int,
  toUserId: int,
  householdId: int,
}

{
  'send an invitation to a user by name': {
    verb: 'POST',
    url: '/api/invitations',
    requestBody: {
      toUsername: string
    },
    responseBody: Invitation,
  },

  'get all sent invitations': {
    verb: 'GET',
    url: '/api/invitations/inbox',
    requestBody: null,
    responseBody: [Invitation],
  },

  'get all received invitations': {
    verb: 'GET',
    url: '/api/invitations/inbox',
    requestBody: null,
    responseBody: [Invitation],
  },

  'delete an invitation': {
    verb: 'DELETE',
    url: '/api/invitations/:invitationId',
    requestBody: null,
    repsonseBody: null
  }
}