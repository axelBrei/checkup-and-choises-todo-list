# Checkup & Choices To-do list application

Sample To-do list application using expo with react-native-web and animations.

This is a simple app where you can add or remove tasks, and complete them, each time a task is completed a quoute will be displayed on a bottom sheet toast.

**Table of content**

- [How to run the app](#how-to-run-the-app)
- [Project structure](#project-structure)
- [Possible improvements](#possible-improvements)
  - [Folder structure improvement](#folder-structure-improvement)
  - [Navigation improvement](#navigation-improvement)
  - [State management improvement](#state-management-improvement)
  - [Progressive web application improvement](#progressive-web-application-improvement)

<br/>
<br/>

## How to run the app

First we need to install the dependencies by running `yarn install`

- Run for android: `yarn android`
- Run for iOS: `yarn ios`
- Run for web: `yarn web`

## Project structure

[root](.)

- [assets](./assets/): All app assets are placed here
- [src](./src/)
  - [components](./src/components/)
  - [hooks](./src/components/)
  - [models](./src/components/)
  - [screens](./src/components/)
- [App.tsx](./App.tsx)

<br/>

## Libraries used

- [`expo`](http://expo.dev): Simplifies react-native app creation and environment setup
- [`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/): UI thread animations, more performant that react-native Animation API and it also works on web
- [`nativewind`](https://www.nativewind.dev/v4/overview): react-native tailwind replacement, I've chosen this library because on web it uses native tailwind so not boilerplate for styles and also have full support for web and web screen responsiveness
- [`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context): Improved library for SafeAreaView
- [`@react-native-async-storage/async-storage`](https://react-native-async-storage.github.io/async-storage/docs/usage/): Library for pesisting data into phone or browser storage

## Possible improvements

### Folder structure improvement

In a real life scenario where a project is bigger I'd change the `screen` folder aproach for a `domains` where each domain is a bussines feature (Ex. authentication, [screener](https://my.checkupandchoices.com/screener/questions), profile, etc.)

### Navigation improvement

Following the line of a real case scenario or any other scenario where the app have more than one screen I would add a navigation library like [`react-navigation`](https://reactnavigation.org/) or [`expo-router`](https://docs.expo.dev/router/introduction/)

### State management improvement

Also we might consider adding a state management library, for a small aplication like this we could use recoil (less boilerplate and performant) but if the state starts to get complex or bigger we might need something like redux (more robust, but also more boilerplate and overhead)

### Progressive web application improvement

Since the web and native application could be the same, there is a small gray in the middle which is a PWA, where the user can install the app from the browser and use an offline version of it.

_Link_: https://docs.expo.dev/guides/progressive-web-apps/
