
[![Coverage Status](https://coveralls.io/repos/github/olorunwalawrence/book-a-meal/badge.svg?branch=develop)](https://coveralls.io/github/olorunwalawrence/book-a-meal?branch=develop)


# book-a-meal


* book a meal is a web application that allows users  to book for his/her favorite meal and also allows caterers to create and set meal for the day

* This project motivates me  because its a challenges me a lot and its been my goal to be a web application developer

* book a meal web application is built on JavaScript programming language, an implementation of JS on back-end was adequate.

## Features Implemented

### Users (Caterers and Customers)

* Users should be able to signin and signup on the app as either a caterer or a customer

### Caterers

* Caterers should be able to create meals
* Caterers should be able to modify meas
* Caterers should be able to delete meals
* Caterers should be able to setup menu for a particular day
* Caterers should be able to modify menu for a particular day
* Caterers should be able to get a particular order
* Caterers should be able to mark a pending order as delivered
* Caterers should be able to get all their orders on the platform
* Caterers should be able to get all their orders for a specific day
* Caterers should be able to get notifications when their meals are ordered

### Customers

* Customers should be able to make an order
* Customers should be able to modify or cancel an order within 100 seconds of creating it
* Customers should be able to get the menu for the day
* Customers should be able to get a particular order
* Customers should be able to get all their orders on the platform
* Customers should be able to get all their orders for a specific day
* Customers should be able to get notifications when caterers set the menu for the day

## Getting Started

### Installation
Download Nodejs app on your local machine
* [https://git-scm.com/downloads">Download git bash terminal on your local machine]
* [https://www.getpostman.com/apps">Download postman app on your local machine so that you can test your routes]
* After downloading the nodejs app, you will automatically have npm installed already. Npm, is node package manager.
* Install [NodeJS](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) on your computer
* Install [Sequelize-CLI](https://www.npmjs.com/package/sequelize-cli) globally
* Clone this repository using `git clone https://github.com/olorunwalawrence/book-a-meal.git`
* Use the `.env.example` file to setup your environmental variables and rename the file to `.env`
* Run `npm install` to install all dependencies
* Run `npm run migrate` to setup your database
* You can optionally run `npm run seed` to use the seed data provided
* Run `npm run build` to build the project
* Run `npm start` to start the server
* Navigate to [http://localhost:9000/api/v1](http://localhost:9000/api/v1) in browser to access the application

### Development

You can run `npm run start:dev` in development to use [Nodemon](https://nodemon.io/)

[Nodemon](https://nodemon.io/) watches for file changes and restarts your server.

### Testing

#### Testing with Postman

* After installing as shown above
* Navigate to [http://localhost:9000/api/v1](http://localhost:9000/api/v1) in
  [Postman](https://getpostman.com/) to access the application
* Use the [API Documentation]  below to access the endpoints available


## Limitations

* Application is not integrated with a payment platform
* Application is not real time
* Orders cannot be filtered by status or date


## Contributing Guide

* Fork the repository
* Make your contributions
* Write Test Cases for your contribution with at least **80%** coverage
* Create a pull request against the develop branch

## FAQs

* What language is used to build this application?

  * The application (backend) is entirely built with Javascript

* Is this an open-source project?

  * Yes, this is an open-source project.

* Who can contribute ?

  * Anyone can contribute as long as you follow the contribution guide outlined above

* Is the application licensed ?

  * Yes, the application is licensed under the [MIT license](https://github.com/olorunwalawrence/book-a-meal/blob/develop/LICENSE)

## License

&copy; Olorunwa lawrence

Licensed under the [MIT License](https://github.com/olorunwalawrence/book-a-meal/blob/develop/LICENSE)


## AUTHENTICATION


* An authorization token is required to access all protected endpoints. Only the Login and Signup endpoints do not require an authorization token. The Login and Signup endpoints are used to generate Authorization Tokens.

* Authorization tokens expire after 48 hours after they are generated.

* BookAMeal expects a token to be included in all protected API requests to the server in a header that looks like the following:

* You must replace averylong.jsonwebtoken.requiredforauthentication with your personal Authorization Token.

## Signup

REQUEST BODY CUSTOMER

 * "role": "customer",
 * "firstname": "John",
 * "lastname": "Doe",
 * "email": "john@doe.com",
 * "address": "$, Herbert Macaulay Way, Yaba, Lagos",
 * "password": "emiolaolasanmi",


REQUEST BODY CATERER
* "role": "caterer",
*  "businessName": "Food Circle",
*  "email": "food@circle.com",
* "password": "foodcircle",
* "passwordConfirm": "foodcircle",
* "phoneNo": "08166557788",
* "address": "$, Herbert Macaulay Way, Yaba, Lagos"
  
Open the postman and test the following existing routes:
<table>
    <tr>
        <th>API</th>
        <th>HTTP verb</th>
        <th>Action</th>
    </tr>
    <!-- yet to be implemented -->
    <tr>
        <td>/api/v1/meals</td>
        <td>POST</td>
        <td>Create new meals</td>
    </tr>
     <!-- yet to be implemented -->

    <tr>
        <td>/api/v1/signup</td>
        <td>POST</td>
        <td>Sign up user</td>
    </tr>
    <tr>
        <td>/api/v1/login</td>
        <td>POST</td>
        <td>Sign in user</td>
    </tr>
    <tr>
        <td>/api/v1/menu</td>
        <td>POST</td>
        <td>post new menu</td>
    </tr>
     <tr>
        <td>/api/v1/orders</td>
        <td>POST</td>
        <td>make new order</td>
    </tr>
    <tr>
        <td>/api/v1/meals/:meal id</td>
        <td>PUT</td>
        <td>Update a meal</td>
    </tr>
     <tr>
        <td>/api/v1/orders/:orders id</td>
        <td>PUT</td>
        <td>Update an order</td>
    </tr>
    <tr>
        <td>/api/v1/meals/:meal id</td>
        <td>DELETE</td>
        <td>Remove a meal</td>
    </tr>
    <tr>
        <td>/api/v1/meals</td>
        <td>GET</td>
        <td>Find all meal </td>
    </tr>
     <tr>
        <td>/api/v1/menu</td>
        <td>GET</td>
        <td>Find all menu </td>
    </tr>
     <tr>
        <td>/api/v1/order</td>
        <td>GET</td>
        <td>Find all order </td>
    </tr>
   
</table>
