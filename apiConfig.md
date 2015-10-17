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
        displayName: string, //optional?
      }

    /:userId
      get: n/a (userId will already be in header)
      put: {
        password: string, //optional
        displayName: string, //optional
        householdId: 
      }
      delete: n/a (userId will already be in header)

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
        itemId: integer,
      }
      put: {
        itemId: integer
        description: string, //optional
        details: string, //optional
        fetch: true, //optional
        bought: true, //optional
        price: decimal, //optional
      }
      delete: {
        itemId: integer,
      }
