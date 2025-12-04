# GLOBAL (app.js / mainRouter)

# --------------------------------------------------

**Middleware:** setAccessFlags

- req.user = User | null
- req.isAdmin = boolean

# /api/v1/user (userRouter)

# --------------------------------------------------

## GET /user/

**Middleware chain:**

- setAccessFlags
- requireAdmin

**req state before controller:**

- req.user = authenticated admin
- req.isAdmin = true
- req.isSelf = undefined

## GET /user/search

**Middleware chain:**

- setAccessFlags
- requireUser

**req state:**

- req.user = authenticated user
- req.isAdmin = boolean

## GET /user/:userId

**Middleware chain:**

- setAccessFlags
- setisSelf
- requireUser

**req state:**

- req.user = authenticated user
- req.isAdmin = boolean
- req.isSelf = (req.user.\_id === params.id)

## POST /user/register

**Middleware chain:**

- setAccessFlags
- requireGuest
- validateBody([userName, emailAddress, nickName, password, country, languageCode])
- checkDuplicateUser

**req state:**

- req.user = null
- req.isAdmin = false

## POST /user/login

**Middleware chain:**

- setAccessFlags
- requireGuest
- validateBody([userName, emailAddress, password])

**req state:**

- req.user = null

## PATCH /user/:userId/password

**Middleware chain:**

- setAccessFlags
- setisSelf
- requireSelf
- validateBody([currentPassword, newPassword])

**req state:**

- req.user = authenticated user
- req.isSelf = true

## PATCH /user/:userId/img

**Middleware chain:**

- setAccessFlags
- setisSelf
- requireSelf
- uploadMemory.single("img")

**req state:**

- req.user = authenticated user
- req.isSelf = true
- req.file = uploaded file

## PATCH /user/:userId

**Middleware chain:**

- setAccessFlags
- setisSelf
- requireSelfOrAdmin
- requireReqBody
- checkDuplicateUser

**req state:**

- req.user = authenticated user
- req.isSelf = boolean
- req.isAdmin = boolean
- req.body = dynamic validated body

## DELETE /user/:userId/img

**Middleware chain:**

- setAccessFlags
- setisSelf
- requireSelfOrAdmin

**req state:**

- req.user, req.isSelf, req.isAdmin available

## DELETE /user/:userId

**Middleware chain:**

- setAccessFlags
- setisSelf
- requireSelfOrAdmin

**req state:**

- req.user, req.isSelf, req.isAdmin available

# CHILD ROUTES (userChildrenRouter)

# --------------------------------------------------

Mounted at: `/user/:userId/*`  
(mergeParams: true)

Runs AFTER:

- setAccessFlags
- setisSelf

Then:

**Middleware:** `requireSelfOrAdmin`

**Effect:**

- req.user must be Self or admin

## findOrCreateByUser(Model)

Creates or fetches the user's subdocument.

**req state added:**

- `req.doc = the child document`
- `req.status = 200 | 201`

# CHILD RESOURCE ROUTERS

# --------------------------------------------------

Paths:

- `/user/:userId/appSettings`
- `/user/:userId/favorites`
- `/user/:userId/friends`
- `/user/:userId/requests`

Common middlewares inside each child router:

- validateBody(...)
- requireUser / requireSelfOrAdmin / requireSelf
- uploadMemory (if used)

**req state always includes:**

- req.user
- req.isAdmin
- req.isSelf
- req.doc
- req.status

# ERROR HANDLER

# --------------------------------------------------

Receives:

- req.user (may be null)
- req.method
- req.path

Returns JSON:

- `{ error, status, path, method }`
