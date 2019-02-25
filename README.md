 [![Coverage Status](https://coveralls.io/repos/github/olorunwalawrence/book-a-meal/badge.svg?branch=develop)](https://coveralls.io/github/olorunwalawrence/book-a-meal?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/58dd494b4abf4b899da1/maintainability)](https://codeclimate.com/github/olorunwalawrence/book-a-meal/maintainability)

# book-a-meal


* book a meal is a web application that allows users  to book for his/her favorite meal and also allows caterers to create and set meal for the day

* This project motivates me  because its a challenges me a lot and its been my goal to be a web application developer

* book a meal web plication is built on JavaScript programming language, an implementation of JS on the front-end and back-end was adequate.

How to use the application

* As a new user, navigate to the sign-up page through the link provided at the top right corner of the home page.
* fill the form and sign up

* A signed up caterer can also log in through their signup credentials;
you can create a meal, set meal for the day, view all order for a specific day and total revenue.
* As a caterer you can signup

* As an authenticated user, you can log in into your account via the login form provided at the home page. Only an authenticated user can log in otherwise sign up.
*an uthenticated user can order for a meal, edit his/her order/ view all his/her orders.
visit us at https://olorunwalawrence.github.io/book-a-meal/UI on your browser

Programming Stack

Express
html
Nodejs
css
How To Build book-a-meal  app

Download Nodejs app on your local machine
<li><a href="https://git-scm.com/downloads">Download git bash terminal on your local machine</a></li>
<li><a href="https://www.getpostman.com/apps">Download postman app on your local machine so that you can test your routes</a></li>
</ul>
After downloading the nodejs app, you will automatically have npm installed already. Npm, is node package manager.

Then clone or download this Repo to your local machine. On your terminal, cd into the directory where you have the file downloaded to and then install the packages by typing
npm install
this will install all dependencies and dev-dependencies for the project, then run this command in your terminal:
npm start

Open the postman and test the following existing routes:
visit us at https://olorunwalawrence.github.io/book-a-meal/UI on your browser

Programming Stack
    Express
    Html
    Nodejs
    css
    React

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
        <td>/api/v1/meal/:meal id</td>
        <td>PUT</td>
        <td>Update a meal</td>
    </tr>
     <tr>
        <td>/api/v1/orders/:orders id</td>
        <td>PUT</td>
        <td>Update an order</td>
    </tr>
    <tr>
        <td>/api/v1/meal/:meal id</td>
        <td>DELETE</td>
        <td>Remove a meal</td>
    </tr>
    <tr>
        <td>/api/v1/meal</td>
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
