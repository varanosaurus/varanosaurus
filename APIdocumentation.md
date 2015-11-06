##Authentication and account creation
|Path|Method|Request Body|Response Body|Side Effects|
|----|------|------------|---------------|------------|
|`/auth/login`|POST|`{username: String, password: String}`|`{userData: Object, token: String, invitations: Object}`|None|
|`/auth/signup`|POST|`{username: String, password: String}`|`{user: Object, token: String}`|Creates new user record in database|

##User routes
|Path|Method|Request Body|Response Body|Side Effects|
|----|------|------------|---------------|------------|
|`/users/:userId`|GET|None|`{user: Object}`|None|
|`/users/:userId`|PUT|`{Fields to be updated}`|`{user: Object, token: String}`|Modifies fields of user record in database|
|`/users/:userId`|DELETE|None|`{success: Boolean, deletedUserId: Integer}`|Removes user record from database|

##Household routes
|Path|Method|Request Body|Response Format|Side Effects|
|----|------|------------|---------------|------------|
|`/households`|POST|`{name: String}`|`{user: Object, household: Object, token: string}`|Creates new household record in database and associates it with the creating user|
