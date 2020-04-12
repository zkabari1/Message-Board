# Message-Board

Single Page Application to post/view messages built with Node and Angular. 
Server is built using Express.
It uses Angular Material for styling. 
Lets you register user, login/logout mechanism using security middleware with tokens and authorization.

Steps to run the project:
1. Front end/client can be run if you have nodejs, npm and angular installed.
2. Use angular cli - ng serve command to start project.
3. Open browser and type http://localhost:4200

Steps to start backend server:
1. Install nodemon and express
2. Run nodemon server.js to start server and restart it automatically if any changes are made to server.
3. You can use postman to verify requests and responses.
4. Set port in the server file at app.listen(port) and hit http://localhost:port/api/messages
