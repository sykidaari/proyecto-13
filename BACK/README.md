# · Backend ·

### Table of Contents

- **[API Reference](#api-reference)**
  - [Routes](#routes)
    - [Base Route](#base-route)
    - [User](#user)
    - [Favorites](#favorites)
    - [Watchlist](#watchlist)
    - [Watched Medias](#watched-medias)
    - [Liked Medias](#liked-medias)
    - [App Settings](#app-settings)
    - [Friends](#friends)
    - [Sessions List](#sessions-list)
    - [Sessions](#sessions)
    - [Media](#media)
    - [Top Shows Images](#top-shows-images)

## API Reference

### Routes

This section displays every **route** in the **API**, and any neccessary information about it, such as:

- Available **methods**
- Who can **access** it (authorization) (may depend on method)
- Required and/or allowed **req.body**
- What it **returns**

- Additional information about:
  - What the route does, modifies, etc.
  - Middlewares or controllers

Information will be minimal, only as necessary. If for example no body is specified, it means no body is allowed. Check other sections for further and more general information on middlewares, controllers, etc.

#### Base Route

`/api/v1`

- This is the entrance to the app, all routes pass through here
- General middlewares:
  - `rateLimit.general`: sets basic rate limit for whole app
  - `setBasicAccessFlags`: sets basic access flags for whole app (depending on the logged in user, if any), used in other access middlewares

#### User

Note: Some responses include additional fields depending on access level (self vs admin).

`/api/v1/user`

- **GET**
  - Access : admin
  - Description : gets all users
    <br>

`/api/v1/user/search`

- **GET**
  - Access : user
  - Description : searches within all users with **req.query** `query`
  - Example : `/user/search?userName=john`
    <br>

`/api/v1/user/check-username`

- **GET**
  - Access : anyone
  - Description : checks if a userName is available with **req.query** `userName`
  - Example : `/user/check-username?userName=john123`
    <br>

`/api/v1/user/check-email`

- **GET**
  - Access : anyone
  - Description : checks if an emailAddress is available with **req.query** `emailAddress`
  - Example : `/user/check-email?emailAddress=john@mail.com`
    <br>

`/api/v1/user/register`

- **POST**
  - Access : guest
  - Body :
    - Required : `userName`, `emailAddress`, `nickName`, `password`, `countryCode`, `languageCode`
    - Optional : —
    - Example :
      ```
      {
        "userName": "john123",
        "emailAddress": "john@mail.com",
        "nickName": "john",
        "password": "••••••••",
        "countryCode": "ES",
        "languageCode": "en"
      }
      ```
  - Description : registers a new user
    <br>

`/api/v1/user/login`

- **POST**
  - Access : guest
  - Body :
    - Required : `password`
    - Optional : `userName`, `emailAddress`
    - Example :
      ```
      {
        "password": "••••••••",
        "userName": "john123"
      }
      ```
  - Description : logs in a user
    <br>

`/api/v1/user/:userId`

- **GET**
  - Access : user
  - Description : gets a user by id
    <br>

- **PATCH**
  - Access : self | admin
  - Body :
    - Required : —
    - Optional :
      - Always allowed :
        - `userName`
        - `nickName`
      - Only if self :
        - `emailAddress`
        - `countryCode`
        - `languageCode`
        - `accountSettings.isSharedInfo.watchList`
        - `accountSettings.isSharedInfo.favorites`
        - `accountSettings.tutorialCompleted`
      - Only if admin :
        - `role`
    - Example :
      ```
      {
        "nickName": "newNick",
        "languageCode": "es",
        "accountSettings": {
          "tutorialCompleted": true
        }
      }
      ```
  - Description : edits user data
    <br>

- **DELETE**
  - Access : self | admin
  - Description : deletes a user
    <br>

`/api/v1/user/:userId/password`

- **PATCH**
  - Access : self
  - Body :
    - Required : `currentPassword`, `newPassword`
    - Optional : —
    - Example :
      ```
      {
        "currentPassword": "••••••••",
        "newPassword": "••••••••"
      }
      ```
  - Description : changes user password
    <br>

`/api/v1/user/:userId/img`

- **PATCH**
  - Access : self
  - Body :
    - Required : `img`
    - Optional : —
    - Example :
      ```
      {
        "img": "<file>"
      }
      ```
  - Description : uploads or replaces profile picture
    <br>

- **DELETE**
  - Access : self | admin
  - Description : deletes profile picture
    <br>

#### Favorites

`/api/v1/user/:userId/favorites`

- **GET**
  - Access : self | admin | friend (depending on privacy)
  - Description : gets user favorites
    <br>

- **PATCH** `/genre`
  - Access : self | admin
  - Body :
    - Required : `genre`
    - Optional : —
    - Example :
      ```
      {
        "genre": "action"
      }
      ```
  - Description : adds a genre to favorites
    <br>

- **PATCH** `/genre/remove`
  - Access : self | admin
  - Body :
    - Required : `genre`
    - Optional : —
    - Example :
      ```
      {
        "genre": "action"
      }
      ```
  - Description : removes a genre from favorites
    <br>

- **PATCH** `/media`
  - Access : self | admin
  - Body :
    - Required : full media data
    - Optional : —
    - Example :
      ```
      {
        "mediaId": "tt1234567",
        "media": { "title": "Movie title" },
        "languageCode": "en"
      }
      ```
  - Description : adds media to favorites
    <br>

- **PATCH** `/media/remove`
  - Access : self | admin
  - Body :
    - Required : `mediaId`
    - Optional : —
    - Example :
      ```
      {
        "mediaId": "tt1234567"
      }
      ```
  - Description : removes media from favorites
    <br>

#### Watchlist

`/api/v1/user/:userId/watch-list`

- **GET**
  - Access : self | admin | friend (depending on privacy)
  - Description : gets user watchlist
    <br>

- **PATCH** `/media/add`
  - Access : self | admin
  - Body :
    - Required : full media data
    - Optional : —
    - Example :
      ```
      {
        "mediaId": "tt1234567",
        "media": { "title": "Movie title" },
        "languageCode": "en"
      }
      ```
  - Description : adds media to watchlist
    <br>

- **PATCH** `/media/remove`
  - Access : self | admin
  - Body :
    - Required : `mediaId`
    - Optional : —
    - Example :
      ```
      {
        "mediaId": "tt1234567"
      }
      ```
  - Description : removes media from watchlist
    <br>

#### Watched Medias

`/api/v1/user/:userId/watched-medias`

- **GET**
  - Access : self | admin | friend | session participant
  - Description : gets watched medias
    <br>

- **PATCH** `/media/add`
  - Access : self
  - Body :
    - Required : `mediaId`
    - Optional : —
    - Example :
      ```
      {
        "mediaId": "tt1234567"
      }
      ```
  - Description : marks media as watched
    <br>

- **PATCH** `/media/remove`
  - Access : self
  - Body :
    - Required : `mediaId`
    - Optional : —
    - Example :
      ```
      {
        "mediaId": "tt1234567"
      }
      ```
  - Description : marks media as unwatched
    <br>

#### Liked Medias

`/api/v1/user/:userId/liked-medias`

- **GET**
  - Access : self | admin | friend | session participant
  - Description : gets liked medias
    <br>

- **PATCH** `/like`
  - Access : self
  - Body :
    - Required : `mediaId`
    - Optional : —
    - Example :
      ```
      {
        "mediaId": "tt1234567"
      }
      ```
  - Description : likes a media
    <br>

- **PATCH** `/unlike`
  - Access : self
  - Body :
    - Required : `mediaId`
    - Optional : —
    - Example :
      ```
      {
        "mediaId": "tt1234567"
      }
      ```
  - Description : unlikes a media
    <br>

#### App Settings

`/api/v1/user/:userId/private/appSettings`

- **GET**
  - Access : self
  - Description : gets app settings
    <br>

- **PATCH**
  - Access : self
  - Body :
    - Required : —
    - Optional :
      - `reset`
      - `syncedAcrossDevices`
      - `settings` (object, dynamic)
    - Example :
      ```
      {
        "syncedAcrossDevices": true,
        "settings": {
          "theme": "dark",
          "language": "en"
        }
      }
      ```
  - Description : edits app settings, or resets them depending on body
    <br>

#### Friends

`/api/v1/user/:userId/private/friends`

- **GET**
  - Access : self | admin
  - Description : gets user friends
    <br>

- **PATCH** `/remove`
  - Access : self | admin
  - Body :
    - Required : `otherUserId`
    - Optional : —
    - Example :
      ```
      {
        "otherUserId": "64f1c2e8a9b3c123456789ab"
      }
      ```
  - Description : removes a friend
    <br>

`/api/v1/user/:userId/private/requests`

- **GET**
  - Access : self | admin
  - Description : gets user friend requests
    <br>

- **PATCH** `/send`
  - Access : self
  - Body :
    - Required : `user`
    - Optional : —
    - Example :
      ```
      {
        "user": "64f1c2e8a9b3c123456789ab"
      }
      ```
  - Description : sends a friend request
    <br>

- **PATCH** `/accept`
  - Access : self
  - Body :
    - Required : `user`
  - Description : accepts a friend request
    <br>

- **PATCH** `/cancel`
  - Access : self
  - Body :
    - Required : `user`
  - Description : cancels a sent friend request
    <br>

- **PATCH** `/reject`
  - Access : self
  - Body :
    - Required : `user`
  - Description : rejects a friend request
    <br>

- **PATCH** `/mark-all-seen`
  - Access : self
  - Description : marks all received friend requests as seen
    <br>

#### Sessions List

`/api/v1/user/:userId/private/sessions-list`

- **GET**
  - Access : self
  - Description : gets sessions list
    <br>

- **PATCH** `/mark-seen`
  - Access : self
  - Body :
    - Required : `session`
    - Optional : —
    - Example :
      ```
      {
        "session": "64f1c2e8a9b3c123456789ab"
      }
      ```
  - Description : marks a session as seen
    <br>

#### Sessions

`/api/v1/user/:userId/session`

- **GET**
  - Access : admin
  - Description : gets all sessions
    <br>

`/api/v1/user/:userId/session/shared/:otherUserId`

- **GET**
  - Access : user
  - Description : gets shared sessions with another user
    <br>

`/api/v1/user/:userId/session/request`

- **PATCH** `/mark-all-seen`
  - Access : self
  - Description : marks all received session requests as seen
    <br>

- **PATCH** `/send`
  - Access : self
  - Body :
    - Required : `otherUserId` (otherUserId can be single ("" String) or mutiple ([] Array))
    - Optional :
      - `additionalPayload.sessionName`
      - `additionalPayload.includedMedia.mediaType`
      - `additionalPayload.includedMedia.genres`
      - `additionalPayload.sessionParameters.includedMedia.keyWord`
      - `additionalPayload.includedMedia.availability.services`
      - `additionalPayload.includedMedia.availability.country`
    - Example :
      ```
      {
        "otherUserId": "64f1c2e8a9b3c123456789ab",
        "additionalPayload": {
          "sessionName": "Movie night",
          "includedMedia": {
            "genres": ["action"]
          }
        }
      }
      ```
  - Description : sends one or multiple session requests
    <br>

- **PATCH** `/accept`
  - Access : self
  - Body :
    - Required : `otherUserId`
  - Description : accepts a session request and joins session
    <br>

- **PATCH** `/cancel`
  - Access : self
  - Body :
    - Required : `otherUserId`
  - Description : cancels a sent session request
    <br>

- **PATCH** `/reject`
  - Access : self
  - Body :
    - Required : `otherUserId`
  - Description : rejects a session request
    <br>

`/api/v1/user/:userId/session/:sessionId`

- **GET**
  - Access : session participant | admin
  - Description : gets a session by id
    <br>

- **PATCH** `/leave`
  - Access : self
  - Description : leaves a session
    <br>

`/api/v1/user/:userId/session/:sessionId/interact`

- **PATCH** `/propose-match`
  - Access : self
  - Body :
    - Required : `mediaId`, `media.title`, `languageCode`
    - Optional : media details
    - Example :
      ```
      {
        "mediaId": "tt1234567",
        "media": { "title": "Movie title" },
        "languageCode": "en"
      }
      ```
  - Description : proposes a media match
    <br>

- **PATCH** `/discard`
  - Access : self
  - Body :
    - Required : `mediaId`
  - Description : discards a media proposal
    <br>

`/api/v1/user/:userId/session/:sessionId/request`

- **PATCH** `/send`
  - Access : self
  - Body :
    - Required : `otherUserId`, `requestGroupId`
    - Example :
      ```
      {
        "otherUserId": "64f1c2e8a9b3c123456789ab",
        "requestGroupId": "abc123"
      }
      ```
  - Description : sends a session request for an existing session
    <br>

#### Media

`/api/v1/media`

- **GET**
  - Access : admin
  - Description : gets all media documents
    <br>

`/api/v1/media/fetch`

- **GET**
  - Access : user
  - Description : fetches medias from external services (proxy) with **req.queries**
  - Queries :
    - Required : `countryCode`, `languageCode`
    - Optional : `showType` (movie|series), `genres`,`services`,`keyword`, `cursor`
  - Example : `/api/v1/media/fetch?countryCode=us&lang=en&showType=movie`
    <br>

`/api/v1/media/:mediaId`

- **GET**
  - Access : user
  - Description : gets a media by id
    <br>

#### Top Shows Images

`/api/v1/top`

- **GET**
  - Access : admin
  - Description : gets all top shows images documents
    <br>

`/api/v1/top/:country/:service`

- **GET**
  - Access : anyone
  - Description : gets top shows images for a country and service
    <br>
