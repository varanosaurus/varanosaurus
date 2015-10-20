//USERS
{
  'sign up a user': {
    verb: 'POST',
    url: '/auth/signup',
    requestBody: {
      accountName: 'string',
      password: 'string',
      displayName: 'string', //optional
    },
    responseBody: {
      user: {
        id,
        accountName,
        displayName,
        updatedAt,
        createdAt,
        householdId,
      },
      token: token,
    },
  },

  'get a user\'s info': {
    verb: 'GET',
    url: '/api/users/:userId',
    requestBody: {},
    responseBody: {
      user, //see POST for props that will be included
      token,
    }
  },

  'change a user\'s info': {
    verb: 'PUT',
    url: '/api/users/:userId',
    requestBody: {
      'propertyToChange': 'thingtoChangeItTo',
      'anotherThing': 'anotherChange',
    },
    responseBody: {
      updates: {
        'propertyThatWasChanged': 'changedVal',
        'anotherPropToChange': 'otherChangedVal',
      },
      token,
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
      householdName: 'string',
    },
    responseBody: {
      household: {
        id,
        name,
        updatedAt,
        createdAt,
        creatorId,
        captainId,
      }
      token,
    },
  },

  'get a household\'s info': {
    verb: 'GET',
    url: '/api/households/:householdId',
    requestBody: {},
    responseBody: {
      household, //see POST for props that will be included
      token,
    }
  },

  'change a household\'s info': {
    verb: 'PUT',
    url: '/api/households/:householdId',
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
      description: 'string',
    },
    responseBody: {
      item: {
        description: 'string',
        details: 'string',
        fetch: 'boolean',
        bought: 'boolean',
        price: 'decimal as string',
        timeFetched: 'date',
        timeBought: 'date',
        id: 'number',
        createdAt: 'date',
        updatedAt: 'date',
        householdId: 'number',
        addingUserId: 'number',
        fetchingUserId: 'number',
        buyingUserId: 'nubmer',
        reckoningId: 'number',
      }
      token,
    },
  },

  'get an item\'s info': {
    verb: 'GET',
    url: '/api/items/:itemId',
    requestBody: {},
    responseBody: {
      item, //see POST for props that will be included
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
  'add a item': {
    verb: 'POST',
    url: '/api/households/',
    requestBody: {
      householdName: 'string',
    },
    responseBody: {
      household: {
        id,
        name,
        updatedAt,
        createdAt,
        creatorId,
        captainId,
      }
      token,
    },
  },

  'get a household\'s info': {
    verb: 'GET',
    url: '/api/households/:householdId',
    requestBody: {},
    responseBody: {
      household,
      token,
    }
  },

  'change a household\'s info': {
    verb: 'PUT',
    url: '/api/households/:householdId',
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