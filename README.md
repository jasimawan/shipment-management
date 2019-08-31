# ShipmentManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

THE BACKEND SERVER IS DEPLOYED USING MONGODB ATLAS SO IF YOU FACE TROUBLE CONNECTING JUST GO TO app.js OF BACKEND, AND CHANGE THE CONNECTION STRING TO WITH YOUR OWN MONGO ATLAS STRING.
IN ORDER TO USE THE SYSTEM WITH NEW DATABASE. THERE WILL BE NO ADMIN CREATED IN IT AND THERE IS NO WAY ON THE STARTING PAGE TO CREATE IT THE FIRST TIME. AS ADMIN AND WORKERS CAN ONLY B CREATED WHEN THERE IS ALREADY AN EXISTING ADMIN IN THE DATABASE. SO IN ORDER TO CREATE IT. FOLLOW THE MENTIONED STEPS.
1- GO TO shipment-management/src/app/app-routing.modules.ts.
2- Remove the canActivate tag from sign-up route
3- Run the front-end and backend using commands given in package.json of both.
4- And go to the signup route by typing localhost:"port"/signup.
5- Make a new admin and then place the canActivate tag again on signup route.


## TOOLS NEEDED TO RUN THIS PROJECT
  Angular CLI,
  typescript,
  NodeJS,
  express,
  Mongoose,
  Mongodb,
  router,
  jsonwebtoke,
  bcryptjs,
  mongoose-unique-validator,
  jest,
  TRAVIS CI is used for backend
  
  

## API DOCUMENTATION
https://web.postman.co/collections/3207744-a3637131-bfba-41aa-b298-9c2a0e2d90ce?version=latest&workspace=866748d1-d8d3-4452-8b2c-3dbee739d25d
