/auth
  /login
    post: {
      accountName: string,
      password: string,
    }

/api
  /users

    ''
      post: {
        accountName: string,
        password: string,
        displayName: string,
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
        description: string,
        details: string, //optional
      }

    /:itemId

      get: {
        itemId
      }
      put: {
        description: string, //optional
        fetch: true, //optional
        bought: true, //optional
        price: decimal, //optional
      }
      delete:
