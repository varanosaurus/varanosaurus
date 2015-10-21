//USERS
{
  'sign up a user': {
    verb: 'POST',
    url: '/auth/signup',
    requestBody: {
      accountName: string,
      password: string,
      displayName: string, //optional
    },
    responseBody: {
      user: {
        id: integer,
        accountName: string,
        displayName: string,
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
      accountName: string,
      displayName: string,
      updatedAt: date,
      createdAt: date,
      householdId: integer,
    }
  },

  'change a user\'s info': {
    verb: 'PUT',
    url: '/api/users/:userId',
    requestBody: {
      displayName: string, //optional
      householdId: integer, //optional
    },
    responseBody: {
      updates: {
        displayName: string, //only if included in request
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
     id: integer,
     name: string,
     updatedAt: date,
     createdAt: date,
     creatorId: integer,
     captainId: integer, 
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
    },
    responseBody: {
      item: {
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
      token: token,
    },
  },

  'get an item\'s info': {
    verb: 'GET',
    url: '/api/items/:itemId',
    requestBody: {},
    responseBody: {
      item: {
        description: string,
        details: string,
        fetch: 'boolean',
        bought: 'boolean',
        price: stringified decimal,
        timeFetched: date,
        timeBought: date,
        id: integer,
        createdAt: date,
        updatedAt: date,
        householdId: integer,
        addingUserId: integer,
        fetchingUserId: integer,
        buyingUserId: 'nubmer',
        reckoningId: integer,
      }
      token,
    }
  },

  'change an item\'s info': {
    verb: 'PUT',
    url: '/api/items/:itemId',
    requestBody: {
      'propertyToChange': 'thingtoChangeItTo',
      'anotherThing': 'anotherChange',
    },
    responseBody: {
      updates: {
        'propertyThatWasChanged': 'changedVal',
        'anotherPropToChange': 'otherChangedVal',
        updatedAt: date,
      },
      token: token,
    }
  },

  'delete an user': {
    verb: 'DELETE',
    url: '/api/items/:itemId',
    requestBody: {},
    responseBody: {
      success: boolean,
      deletedHouseholdId: id,
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

  'get a household\'s info': {
    verb: 'GET',
    url: '/api/households/:householdId',
    requestBody: {},
    responseBody: {
      reckoning, //see POST for props that will be included
    }
  },
}