# YouTube Front & Video Page

Building YouTube Front and Video page to polish my skills after going through The Odin Project's HTML course on embedding images and videos, tables, lists, forms and CSS course on positioning, floats, flexbox, grid, backgrounds and gradients.

## Table of contents

- [YouTube Front \& Video Page](#youtube-front--video-page)
  - [Table of contents](#table-of-contents)
- [Github \& Live](#github--live)
  - [Getting Started](#getting-started)
  - [React](#react)
  - [Deploy](#deploy)
  - [Features](#features)
  - [Status](#status)
  - [Contact](#contact)

# Github & Live

Github repo can be found [here](https://github.com/gizinski-jacek/youtube-page).

Live demo can be found on [Render](https://youtube-page.onrender.com).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Install all dependancies by running:

```bash
npm install
```

In the project root directory run the app with:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

Build the app for production to the `build` folder with:

```bash
npm run build
```

Don't forget to add **.env** file with these environment variables for the app:

```
REACT_APP_API_KEY
```

It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deploy

You can easily deploy this app using [Heroku Platform](https://devcenter.heroku.com/articles/git).

Script for running app build after deployment to Heroku is included in package.json.\
In the project root directory run these commands:

```bash
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
heroku create
git push heroku main
heroku open
```

## Features

- Responsive UI
- Fetching trending videos with Youtube API
- Searching videos using Youtube search API
- Watching videos and reading the comments
- Fetching videos related to currently watched one

## Status

Project status: **_FINISHED_**

## Contact

Feel free to contact me at:

```
gizinski.jacek.tr@gmail.com
```
