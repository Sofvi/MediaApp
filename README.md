# MediaApp
## About

Hi all, Our application Travelshare is an application where users can post photos and share their travel experience 
to people all around. It is a simple application targeted to the mobile and tablet users. Frontend is covered through 
the use of HTML, CSS ans Javascript, and the backend is done through nodejs, express and for database mysql2 was used.

## User Story

The idea behind the application development is to create and application where user can post and share just the travel 
experiences to the fellow travellers. Through this people can inspire and get inspired to travel.
The application can be used without having an account which limits the us to the view mode only, where user cannot like a 
post or make comment to any of the post.
Logged in users can make comment, like the post. Only the real owner or the admin of the application owns the right to
delete or modify the post.

## Tools, Libraries

Frontend: 
-HTML 
-CSS
-JavaScript

Backend:
- Nodejs with Express library
- User authentication using Passport library, Local Storage Strategy, JWT Strategy
- Validation through express-validator 
- PAssword hash with bcryptjs and JWT_SECRET
- Database mySql2, HeidiSql/DBeaver

## Server and deployment
- The application is running on remote server of Azure Portal

## Application Installation
- Clone the git repo [Travelshare](https://github.com/Sofvi/MediaApp/)
- Use any of the viable codeEditor for ex: Visual Studio Code
- Install nodejs and the required dependencies
```bash
npm i
```
```bash
node app.js
```
- Install [HeidiSQL](https://www.heidisql.com/) or [DBeaver](https://dbeaver.io/) tool for database
- Copy the file with .sql extention in local machine
- Add .env file to the backend folder, it should have protected information, can't find in git repo
```bash
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
```
- Change all the url into localhost url 
```javascript
const url = 'http://localhost:3000';
```
- Use frontend's html file login.html to run the application
- You get the best experience while using the application on mobile

## Contributors
- [Binod Panta](https://github.com/frozenfi/)
- [Suvi Laitinen](https://github.com/Sofvi/)
- [Roope Laine](https://github.com/Liideli)

