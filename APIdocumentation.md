##Authentication and account creation
|Path|Method|Request Body|Response Body|Side Effects|
|----|------|------------|---------------|------------|
|`/auth/login`|POST|`{username: String, password: String}`|`{userData: Object, token: String, invitations: Object}`|None|
|`/auth/signup`|POST|`{username: String, password: String}`|`{user: Object, token: String}`|Creates new user record in database|

##User routes
|Path|Method|Request Body|Response Body|Side Effects|
|----|------|------------|---------------|------------|
|`/users/:userId`|GET|None|`{user: Object}`|None|
|`/users/:userId`|PUT|`{Updated fields}`|`{user: Object, token: String}`|Modifies fields of user record in database|
|`/users/:userId`|DELETE|None|`{success: Boolean, deletedUserId: Integer}`|Removes user record from database|

##Household routes
|Path|Method|Request Body|Response Format|Side Effects|
|----|------|------------|---------------|------------|
|`/households`|POST|`{name: String}`|`{user: Object, household: Object, token: String}`|Creates new household record in database and associates it with the creating user|
|`/households/:householdId`|GET|None|`{household: Object, users: Array}`|None|
|`/households/:householdId`|PUT|`{Updated fields}`|`{household: Object}`|Modifies fields of household record in database|
|`/households/:householdId`|DELETE|None|`{success: Boolean, deletedHouseholdId: Integer}`|Removes household record from database|

##Reckoning routes
|Path|Method|Request Body|Response Format|Side Effects|
|----|------|------------|---------------|------------|
|`/reckonings`|GET|None|`{reckonings: Array}`|None|
|`/reckonings`|POST|None|`{reckoning: Object}`|Initiates the reckoning process, which tabulates the prices of all purchased but unreckoned items, calculates shares and payments for each member of the associated household, and adds a new reckoning record to the database|
|`/reckonings/:reckoningId`|GET|None|`{reckoning: Object with eagerly-loaded associations}`|None|

##Item routes
|Path|Method|Request Body|Response Format|Side Effects|
|----|------|------------|---------------|------------|
|`/items`|GET|None|`{pending: Array, bought: Array}`|None|
|`/items`|POST|`{description: String, details: String, bought: Boolean, price: Integer}`|`{item: Object}`|Creates new item record in database|
|`/items/:itemId`|GET|None|`{item: Object}`|None|
|`/items/:itemId`|PUT|`{Updated fields}`|`{pending: Array, bought: Array}`|Modifies fields of item record in database|
|`/items/:itemId`|DELETE|None|`{success: Boolean, deletedItemId: Integer}`|Removes item record from database|


##Invitation routes
|Path|Method|Request Body|Response Format|Side Effects|
|----|------|------------|---------------|------------|
|`/invitations`|POST|`{toUsername: String}`|`{invitations: Array}`|Adds a pending invitation to the inbox of `toUsername` and the outbox of the sending user|
|`/invitations/inbox`|GET|None|`{invitations: Array}`|None|
|`/invitations/outbox`|GET|None|`{invitations: Array}`|None|
|`/invitations/:invitationId`|PUT|`{Updated fields}`|`{token: String, household: Object, roommates: Array, invitations: Array}`|If invitation is rejected, marks invitation as rejected. If invitation is accepted, adds the accepting user to household and sends back the relevant data.|
|`/invitations/:invitationId`|DELETE|None|None|Removes invitation record from database|
