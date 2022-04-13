# gymbroh-backend

## Table of contents

<ul>
  <li><a href="#about">About</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#pre-requisites">Pre-requisites</a></li>
  <li><a href="#setup">Setup</a></li>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#inspiration">Inspiration</a></li>
  <li><a href="#infos">Infos</a></li>
</ul> 

## About
<h4 align="center">
  🚧 Still building... 🚧
</h4>

Simple app that allows personal trainers and gyms to schedule exercises in a chosen day for his students.

An instructor can join a gym or a student can link to an instructor. The link is made by a QR Code, the affiliate simply scans the instructor/academy's QRcode and automatically one will be linked as the responsibility of the other.

Once this is done, the instructor will be able to schedule the training sessions for the students, or in the gym case, the gym will be able to view and update the training sessions scheduled by their affiliated instructors.

This application has a complete authentication system with email and password, based on permissions that define which screens you will have access to. This system is based on roles and permissions, each role has its own permissions and each permission is a unique entity. This allows new roles to be created with different permissions. The system also supports validating route permissions based only on permissions rather than roles. At the moment some routes are not validated because I still carry out some tests 🚧, however it is possible to carry out the tests of access to restricted routes by making changes in the src/routes.ts file.

The authentication is based on Json Web Tokens(JWT).

Is used PostgreSQL in this app, so the ORM choosed was typeORM that gives me an elegant way to deal with database.

## Features
<ul>
  <li><p>Authentication system in JWT, based on this <a href="https://levelup.gitconnected.com/react-native-authentication-flow-the-simplest-and-most-efficient-way-3aa13e80af61" target="_blank">article</a></p></li>
  <li><p>Route access control based on user roles</p></li>
  <li><p>User link with QRCode</p></li>
  <li><p>Schedule exercises function</p></li>
  <li><p>Exercises grouped by categories as legs, chest, arms, abs etc</p></li>
</ul>

## Pre-requisites
To runs this app you will need to have on your PC the followings techs:

<ul>
  <li><a href="https://nodejs.org/en/">NodeJs</a></li>
  <li><a href="https://yarnpkg.com/">Yarn</a></li>
  <li>An code editor of your choice, I recommend <a href="https://code.visualstudio.com/">VS Code</a></li>
  <li>Install and setup the <a href="https://github.com/ravinmor/gymbroh-mobile">mobile app</a></li>
</ul>

## Setup
To start the project will be necessary run the following scripts:
```bash
#Clone the repository
$ git clone https://github.com/ravinmor/gymbroh-backend.git

#Access the backend app folder
$ cd gymbroh-backend

#Install packages
$ cd gymbroh-backend

#Start the app
$ yarn dev

# The server wil run on port:3333 - Access <http://localhost:3333>
```

## Technologies
<div style="display: inline_block">
  <img  align="center" alt="Ravin-Typescript" height="50" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
  <img align="center" alt="Ravin-Node" height="50" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg">
  <img align="center" alt="Ravin-Express" height="50" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg">
  <img align="center" alt="Ravin-PostgreSQL" height="50" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg">
</div>
<br/>
<ul>
  <li>bcryptjs: 2.4.3</li>
  <li>cors: 2.8.5</li>
  <li>express: 4.17.1</li>
  <li>jsonwebtoken: 8.5.1</li>
  <li>multer: 1.4.4</li>
  <li>pg: 8.7.1</li>
  <li>reflect-metadata: 0.1.13</li>
  <li>typeorm: 0.2.34</li>
  <li>uuid: 8.3.2</li>
</ul>

## Inspiration
The reason why I created this app is that I noticed that only big gyms had yours own apps, so I decided to built something that could be used by every gym, even the small ones and personal trainers too.

## Infos
<p>Author: <a href="https://github.com/ravinmor">Ravin Mor</a></p>
<p>Email contact: ravinmmor@gmail.com or ravinmenezes@outlook.com</p>
