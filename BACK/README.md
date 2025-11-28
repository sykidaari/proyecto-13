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
- req.isOwner = undefined

## GET /user/search

**Middleware chain:**

- setAccessFlags
- requireUser

**req state:**

- req.user = authenticated user
- req.isAdmin = boolean

## GET /user/:id

**Middleware chain:**

- setAccessFlags
- setIsOwner
- requireUser

**req state:**

- req.user = authenticated user
- req.isAdmin = boolean
- req.isOwner = (req.user.\_id === params.id)

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

## PATCH /user/:id/password

**Middleware chain:**

- setAccessFlags
- setIsOwner
- requireOwner
- validateBody([currentPassword, newPassword])

**req state:**

- req.user = authenticated user
- req.isOwner = true

## PATCH /user/:id/img

**Middleware chain:**

- setAccessFlags
- setIsOwner
- requireOwner
- uploadMemory.single("img")

**req state:**

- req.user = authenticated user
- req.isOwner = true
- req.file = uploaded file

## PATCH /user/:id

**Middleware chain:**

- setAccessFlags
- setIsOwner
- requireOwnerOrAdmin
- requireReqBody
- checkDuplicateUser

**req state:**

- req.user = authenticated user
- req.isOwner = boolean
- req.isAdmin = boolean
- req.body = dynamic validated body

## DELETE /user/:id/img

**Middleware chain:**

- setAccessFlags
- setIsOwner
- requireOwnerOrAdmin

**req state:**

- req.user, req.isOwner, req.isAdmin available

## DELETE /user/:id

**Middleware chain:**

- setAccessFlags
- setIsOwner
- requireOwnerOrAdmin

**req state:**

- req.user, req.isOwner, req.isAdmin available

# CHILD ROUTES (userChildrenRouter)

# --------------------------------------------------

Mounted at: `/user/:id/*`  
(mergeParams: true)

Runs AFTER:

- setAccessFlags
- setIsOwner

Then:

**Middleware:** `requireOwnerOrAdmin`

**Effect:**

- req.user must be owner or admin

## findOrCreateByUser(Model)

Creates or fetches the user's subdocument.

**req state added:**

- `req.doc = the child document`
- `req.status = 200 | 201`

# CHILD RESOURCE ROUTERS

# --------------------------------------------------

Paths:

- `/user/:id/appSettings`
- `/user/:id/favorites`
- `/user/:id/friends`
- `/user/:id/requests`

Common middlewares inside each child router:

- validateBody(...)
- requireUser / requireOwnerOrAdmin / requireOwner
- uploadMemory (if used)

**req state always includes:**

- req.user
- req.isAdmin
- req.isOwner
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
