# Claudy Weather

Claudy... get it? Because my name is Claudia and cloudy.. lol you know what never mind. Anyways! Here's a weather app using Visual Crossing Weather API. It displays today's conditions, hourly forecast, and 10 day forecast.

<img src="./src/assets/imgs/webpage-screenshot.png">

## Features

- Location search by city name
- Current location detection via browser GPS
- Temperature unit toggle (°F / °C)

## Tech Stack

<!-- Badges from https://github.com/Ileriayo/markdown-badges -->

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

## Usage

(Port 8080)

```
  npm run dev
```

## Build for production

```
  npm run build
```

## Deploy/Redeploy to GitHub Pages

Make sure you have all your work committed/pushed on main branch `git status`

Make sure you have a gh-pages branch `git branch gh-pages`

```
  git checkout gh-pages && git merge main --no-edit

  npm run build

  git add dist -f && git commit -m "Deployment commit"

  npm run deploy

  git checkout main
```

Note: Recall that the source branch for GitHub Pages is set in your repository’s settings. Get this changed to the gh-pages branch.
