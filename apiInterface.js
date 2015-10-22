]//USERS
{
  'sign up a user': {
    verb: 'POST',
    url: '/auth/signup',
    requestBody: {
      username: string,
      password: string,
    },
    responseBody: {
      user: {
        id: integer,
        username: string,
        updatedAt: date,
        createdAt: date,
        householdId: integer,
      },
      token: token,
    },
  },

  'get a user\'s info': {
    verb: 'GET',
    url: '/api/users/:userId',
    requestBody: {},
    responseBody: {
      id: integer,
      username: string,
      updatedAt: date,
      createdAt: date,
      householdId: integer,
    }
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
    requestBody: {},
    responseBody: {
      success: boolean,
      deletedUserId: id,
    }
  }
}

//HOUSEHOLDS
{
  'add a household': {
    verb: 'POST',
    url: '/api/households/',
    requestBody: {
      name: string,
    },
    responseBody: {
      household: {
        id: integer,
        name: string,
        updatedAt: date,
        createdAt: date,
        creatorId: integer,
        captainId: integer,
      }
      token,
    },
  },

  'get a household\'s info': {
    verb: 'GET',
    url: '/api/households/:householdId',
    requestBody: {},
    responseBody: {
      household: {
       id: integer,
       name: string,
       updatedAt: date,
       createdAt: date,
       creatorId: integer,
       captainId: integer, 
      },
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

  'delete a user': {
    verb: 'DELETE',
    url: '/api/households/:householdId',
    requestBody: {},
    responseBody: {
      success: boolean,
      deletedHouseholdId: id,
    }
  }
}

//ITEMS
{
  'add an item': {
    verb: 'POST',
    url: '/api/items/',
    requestBody: {
      description: string,
      details: string, //optional
      fetch: boolean, //optional, defaults to false
      bought: boolean, //optional, defaults to false
      price: stringified decimal, //optional, defaults to 0
    },
    responseBody: {
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
    },
  },

  'get an item\'s info': {
    verb: 'GET',
    url: '/api/items/:itemId',
    requestBody: {},
    responseBody: {
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
      buyingUserId: number,
      reckoningId: integer,
    },
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
    requestBody: {},
    responseBody: {
      success: boolean,
      deletedItemId: id,
    }
  }
}

//RECKONINGS
{
  //we didn't talk about having support for this in MVP,
  //but for testing it made sense to have this feature available
  //so it's included here and we can decide later if it's post-MVP or not
  'initiate a reckoning': {
    verb: 'POST',
    url: '/api/reckonings/',
    requestBody: {},
    responseBody: {
      totalSpent: stringified decimal,
      date: date,
      id: integer,
      createdAt: date,
      updatedAt: date,
      householdId: integer,
    },
  },

  'get a reckoning\'s info': {
    verb: 'GET',
    url: '/api/households/:householdId',
    requestBody: {},
    responseBody: {
      totalSpent: stringified decimal,
      date: date,
      id: integer,
      createdAt: date,
      updatedAt: date,
      householdId: integer,
    },
  },
}