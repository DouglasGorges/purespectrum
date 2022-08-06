# PureApp Library
## A complete library app
PureApp looks to be a full library manager. For now, it just show the books registered on and, on that, you can update it or delete it and also add a new one.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

![Deploy to Firebase](https://github.com/DouglasGorges/purespectrum/actions/workflows/firebase-hosting-merge.yml/badge.svg)

## Features

- Add a new book to the database
- Show all registered books
- Edit and delete books from database

## How to use
Go to [PureApp Library](https://pureapp-library.web.app)
### How to log in
At this moment, every user and password will be accepted.
### How to log out
Just close your browser.
### How to ADD a book
Click on 'New Book +' button. Will be opened a dialog to insert book's data.

p.s: On the 'Author' filed, you'll need to click on icon to insert a new Author at the list. To remove, it's just click on the icon who refers to the one who you want to drop away.
By clicking on 'Add' button, the application will try to register the book on the API and, if everything goes to be allrigth, a success message will be showed.

The dialog will be stand opened. This is to let you add many books as you want without needs to open the dialog every time.
Once finished, you can close it by clicking outside of them or pressing 'Cancel' button.
### The list
On the list you'll be able to see every registered books and they details.
Also there, you'll be able to update and delete them.

You can filter the books registered just inserting a few words on 'Filter' input.
### To UPDATE a book data
In the list view, click on the pencil icon. A dialog should be opened with the book data.
Just modify everithing you want.
By clicking on 'Update' button, the application will try to register the book new data on the API and, if everything goes to be allrigth, a success message will be showed.
### To DELETE a book
In the list, you'll need just to click on trash icon.
Be carefull, no confirm messages was implemented yet.
By clicking on trash icon, the application will try to delete the book from API and, if everything goes to be allrigth, a success message will be showed.

## Installation

- Use the package manager [npm](https://www.npmjs.com) to install PureApp Library.
- Clone this git repo on [main](https://github.com/DouglasGorges/purespectrum/tree/main) branch.
- Open your shell inside the cloned folder and type:
```bash
npm install
```
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). This will open your browser to show a tests report. ([Google Chrome](https://www.google.com/chrome/) required)

