/auth
  /login
    post: {
      accountName,
      password,
    }

/api
  /users

    ''
      post: {
        accountName,
        password,
        displayName
      }

    /:userId
      get:
      put:
      delete:

  /reckonings

    ''
      post:

    /:reckoningId
      get:
      put:
      delete:

  /households

    ''
      post:

    /:householdId
      get:
      put:
      delete:

  /items

    ''
      post: {
        description,
        details, //optional
      }

    /:itemId
    
      get: {
        itemId
      }
      put:
      delete: