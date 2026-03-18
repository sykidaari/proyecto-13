# Popcorn: show matching and selection app

## Live demo

Frontend: https://popcorn-front-one.vercel.app/app
<br>
Backend API: https://popcorn-show-matching-and-selection-app.onrender.com

## Table of Contents

- [Introduction/Overview](#introductionoverview)
  <br>
- [STACK and logic](#stack)
  <br>
- [Future implementations (TODO)](#future-implementations-todo)
  - [BACK-END](#back-end)
  - [FRONT-END](#front-end)

### Introduction/Overview

Popcorn is a social app meant for matching shows to watch with your family or friends. Create an user, add other users as friends in the app, and create or join a session to start matching shows. Sessions can be tailored with different options and filters, to be able to select from a catalogue according to the user's/groups wishes. Additionally, on the personal discover page, each user can use the app individually and check out different shows.

**The app is not fully done**. Every feature you see in the front, works correctly, but, as I am only one single developer (running on lots of coffee and mate), and the app is very big, I am still building it and adding features to the app! Mostly every feature already exists in backend, and I need to implement them in front. Please check out the [Missing/upcoming features](#following-features-are-missing) section for full information!

### STACK and logic

The app is served with separate front end and backend.

Please check FRONT/package.json and BACK/package.json to see full dependency lists!

BACKEND/README contains short explanations of all backend routes

**BACKEND** stack:

- Express
- MongoDB through mongoose
- Multer and cloudinary for image uploads
- Socket.io for websocket
- `Streaming availability`: this is the external API used for medias. My own Express server works partially as a sort of proxy for this API. Here's the API https://docs.movieofthenight.com/

The backend routes all have different access levels, so the application is very secure. Authentification is handled via cookie access sessions and rotating tokens.

**FRONTEND** stack:

- React with react-router
- Axios for API (backend) fetches, with strong use of axios interceptors
- Tanstack query (react query) for in-component fetches to the backend (heavily important in the architecture and workflow of the app)
- React hook form for form management
- Motion for swipe cards
- Tailwind and DaisyUI for styling (css in jsx classNames)

### Future implementations (TODO)

#### BACK-END

- Possibly stricter/more refined rate limits
- Two factor authentification
- Password reset system
- Pagination in array endpoints (favorites, sessions, etc.)
- Implement Atlas Search for better searching https://www.youtube.com/watch?v=HsS0z3eOCSQcan
- Email notifications on matches, requests etc.
- Account lockout
- User blocking
- Banned emails/IPs

#### FRONT-END

- Admin page

##### FOLLOWING FEATURES ARE MISSING:

**The following features are all fully built in the backend**, and need to be implemented in the frontend.

###### SESSIONS:

- Notifications and visuals for new matches
- Ability to export/share list of matches
  <br>

###### MEDIAS AND RELATED:

- `MediaButtons`: a set of buttons to be able to add medias to users personal `favorites`, `watchlist`,`liked-medias` and `watched medias` _(explained below)_.
  <br>
  <br>
- `Favorites`: a list of the users favorite medias. Each user can view and modify their own favorites, and if they choose so in their profile settings, their friends may also view their favorites.
- `Watchlist`: _(similar functionality to `favorites`)_ a list of the medias the user wishes to save to watch in the future. Each user can view and modify their own watchlist, and if they choose so in their profile settings, their friends may also view their watchlist.
  <br>
  <br>
- `Liked medias`: a list of medias the user has liked _(heart symbol)_. This domain isn't meant to serve visually as a list, but more so as an indicator on each media. Each user can see what medias they have liked, in the discover page they can additionally see what medias their friends have liked _(this cannot be toggled off)_, and inside sessions they can see what other participants have liked _(this cannot be toggled off)_
  <br>
- `Watched medias`: a list of medias the user has watched _(heart symbol)_. This domain isn't meant to serve visually as a list, but more so as an indicator on each media. Each user can see what medias they have liked, in the discover page they can additionally see what medias their friends have liked _(this cannot be toggled off)_, and inside sessions they can see what other participants have liked _(this cannot be toggled off)_
  <br>
- All of the features mentioned above are pending

###### PROFILES:

- In the user profiles, there are components pending for the lists mentioned above.
- Additionally, there will be in the future a **`settings`** page which is accessed through the profile-page (_/profile_, displays the currently logged in user's profile). In this settings page, the user will be able to change their appSettings: which include app-theme (light-dark), and whether or not these are synced across devices on their account, or on the other hand if they are device specific. They will also be able to change their account settings and information, which include their username, nickname, emailaddress, password, country, language, and whether or not their favorites and watchlist are shared with friends
- In th settings page, the user will also be able to log out

###### GENERAL:

- Each user has a flag called tutorialCompleted: this is in order to be able to create a tutorial/walkthrough for the app when the user first registers. This tutorial is pending. Once the tutorial has been created, when the user has finished it, this flag will be changed from false to true.

- In the public page (before logging in) there is going to be a `features` page that works as a showcase for the app, similar to an app store showcase.

- The backend in provides not only a REST API, but it also starts a **websocket** connection to the front. This socket communicates no sensitive data, so it needs no real protection layer, it only communicates simple string-messages, with one purpose: to inform the front when it should make a new GET request and of what type/to what route, providing real time updates throughout the app. I have yet to create the receiving logic in the front.

- There need to be notifications for when there are updates in a session.

- Invitations can't be made from inside sessions yet.

- There should be a specific message when rate limit is reached for medias
