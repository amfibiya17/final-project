# Palendar

## Contributors

* [Anish Kakaiya](https://github.com/AKCDNG)
* [Russell Morbey](https://github.com/Rmorbey)
* [Erlantz Ramos](https://github.com/ErlantzR)
* [Laura Voss](https://github.com/laura-voss)
* [Slava Yates](https://github.com/amfibiya17)

## Description

This app allows you to schedule a time to hang out with friends within your busy lifestyle. After signing up you'll be able to populate your calendar with your own personal events.

You can then create a group event, where your calendar gets cross referenced with your friends calendars, and determines which days you are all available to hang out.

You also have a choice of who you would like to include in the shared calendar, keeping it private.

## Technologies Used

### MERN Stack

- [MongoDB](https://www.mongodb.com/) | No-sql Database integrated on cloud platform Atlas.
- [Express](https://expressjs.com/) | Web framework for Node.js (Back-end Development).
- [React](https://reactjs.org/) | JavaScript library for building user interfaces (Front-end Development).
- [NodeJS](https://nodejs.org/en/) | JavaScript runtime built on Chrome's V8 JavaScript engine (Back-end Development).

### Notable Others

- [Nodemon](https://nodemon.io/) | Reloads the server automatically.
- [Mongoose](https://mongoosejs.com) | Models objects in MongoDB.
- [ESLint](https://eslint.org) | Linting.
- [Jest](https://jestjs.io/) | Testing.
- [React Testing Library](https://testing-library.com/) | End-to-end testing.
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | Markup language.
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) | Style sheet language.
- [bcrypt] (https://www.npmjs.com/package/bcrypt) | User password encryption and authentication.

### Organisational & Planning Tools

- [Trello](https://trello.com/en) | Kanban tool.
- [Slack](https://slack.com/intl/en-gb/) | Communication tool.
- [Miro](https://miro.com/) | Diagramming tool.
- [Balsamiq](https://balsamiq.com/) | Wireframing tool.

## Card wall

< INSERT TRELLO BOARD IMAGE LATER >

## MVP, design and planning

#### Homepage

![Screenshot 2022-07-05 at 14 27 33](https://user-images.githubusercontent.com/101583630/177339489-b2ba9501-baa8-4085-8b3a-a0eddb1cb16e.png)

#### Sign Up

![Screenshot 2022-07-05 at 14 27 43](https://user-images.githubusercontent.com/101583630/177339533-1187e011-4499-42ad-9c12-69ca9f27f724.png)

#### Sign In

![Screenshot 2022-07-05 at 14 27 55](https://user-images.githubusercontent.com/101583630/177339623-bc79d76a-69b5-4358-861e-557ebbfbca96.png)

#### Personal Calendar

![Screenshot 2022-07-05 at 14 28 07](https://user-images.githubusercontent.com/101583630/177339656-f6c343ec-220d-4758-8ed1-3b99f96d012b.png)

#### Event Calendar

![Screenshot 2022-07-05 at 14 28 22](https://user-images.githubusercontent.com/101583630/177339674-453418fc-8d54-4a7b-a66f-3c43e939eae7.png)

## Team Approach

- Agile Development.
- TDD.
- Early project planning.
- MVP.
- Regular check-in with team members for blockers.

### Work hours

* Start time 9:45am.
* Lunch 12:30pm - 1:30pm.
* End day 6:00pm.

### Daily stand ups and retros.

* Stand ups. 9:45am -10:00am.
* Retro. 5:30pm.

## Demo Photos

< INSERT DEMO PHOTOS AND VIDEO >

## Future Improvements

< MAKE THIS APP >

## How to Run Locally

1. Fork this repository
2. Rename your fork to `Palendar`
3. Clone your fork to your local machine
4. Install Node.js dependencies
   ```
   npm install
   ```
5. Install an ESLint plugin for your editor. For example: [linter-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for vscode.

### Start Server

```
cd backend
npm start
```

Please leave this terminal running in the background.

### Start Client

Open a new terminal.

```
cd client
npm start
```

Please leave this terminal running in the background, the application should open automatically.

### Test

- Run all tests
  ```
  npm test
  ```
- Run a check
  ```bash
  npm run lint              # linter only
  npm run test:unit         # unit tests only
  npm run test:integration  # integration tests only
  ```
