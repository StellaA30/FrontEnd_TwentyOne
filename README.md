
# Game 21 Front-End Project

## **TABLE OF CONTENTS** 📖

> 1. Project Overview
> 2. Project Aim
> 3. Diagrams
> 4. Tech Stack
> 5. Set Up Instructions
> 6. Future


### **_1. Project Overview_**
Our project involved creating a React front-end application that provides a user-friendly interface for one of the server-side APIs developed by another backend group during week 6 of the bootcamp. 

This project was bootstrapped with Create React App.


### **_2. Project Aim_**

* To create a guessing with the following practicality:
* Login/Register an account
* Single player or multiplayer option
* Client having the option to choose the game mode (Easy/Difficult
* Loserboard which displays all players who have completed the game
* A leader play can be able include addition 3 players 
* A coin toss when in single player mode
* A single player being able to save and access their existing the game

### **_3. Diagram_**

### WireFrame Diagram

![WireFrame Diagram](https://github.com/thibyaa/FrontEnd_TwentyOne/assets/105393816/542b40c5-b847-4ebf-83d8-b668ee80b526)


### Component Diagram

![Component Diagram](https://github.com/thibyaa/FrontEnd_TwentyOne/assets/105393816/6da46d54-2e18-4968-8fb7-62499d075adb)


### **_4. Tech Stack_**

<ul>
<li> JavaScript </li>
<li> HTML </li>
<li> CSS </li>
<li> React.js (+ React Router Dom and Multiselect library </li>
</ul>


### **_5. Set Up Instructions_**:

### Server Side API instructions
The server side api can be found here:
https://github.com/thibyaa/Backend_TwentyOne_API


* Software needed to run the API: 
	* IntelliJ and Java (version 17)
	* Postman
	* Postico
	* PostgreSQL

* Installation instructions:
	* Git clone from the server side API Repo
	* Create an SQL database  and name it `Backend_TwentyOne_API` so that it matches with the name in the `application.properties` file (src of server side API)
	* Once your database has been created, run the `BackendTwentyOneApiApplication.java` file in IntelliJ to get started.
	* You can set up your tests using Postman on `localhost:8080/{extension}` or type in `localhost:8080/games` in your browser, for example, to see the games data. More details can be found from the backend repo
	

### Client-side Instructions 
The client-side server can be obtained with the following information:

* Ensure that the following software	has been downloaded:
   * Visual Studio Code

* To create a fork of a repository on GitHub, go to the repository's page and click on the "Fork" button located in the top-right corner. This action will make a copy of the repository under your GitHub account, allowing you to freely make modifications without altering the original project. Fill out any required details, such as the repository name, and then click "Create fork" to complete the process.
* To clone the forked repository, click on the "Code" button at the top of the repository page, select SSH, and copy the provided link. In your terminal, navigate to the desired working directory and use the command "git clone" followed by the copied URL to create a local copy of the repository. Example:
    <pre><code> git clone git@github.com:{YOUR-USERNAME}/client_side_project.git </code></pre>
* To install the necessary node modules, open your terminal in the "frontend_shop_project_client/src" directory within Visual Studio Code and run the command "npm install" or "npm i".

### Run the application
* Once you have installed all the necessary applications and dependencies for this project, run the Backend server API via Intellij IDEA  and on port 8080.
* To start the application in Visual Studio Code, use the command npm start in the terminal. This will automatically open the app in your default browser. If it doesn't open automatically, manually access it by navigating to http://localhost:3000 on a preferred  web browser.


### Routes 
To navigate between pages on the React app, we configured the following routes using the React Router:

1. Landing Page: http://localhost:3000

2. LogIn Page: http://localhost:3000/logIn

3. Single Player Page: http://localhost:3000/singlePlayer

4. Multiplayer Page: http://localhost:3000/multiPlayer

5. Game Page: http://localhost:3000/gamePage

>Note: Depending on what game mode is selected, you will be taken to a single or multiplayer game page.


### **_6. Future_**:

<ol>
<li> Log In Container to be turned into change into a modal (additional library) </li>
<li> Players to be able to choose avatars </li>
<li> Deployment of website </li>
</ol>

## Collaborators 

- GitHub: [Zaynah Sadiq](https://github.com/Zaynah99)
- GitHub: [Stella Annor](https://github.com/StellaA30)
- GitHub: [Fiona Eshun](https://github.com/Fiona2223)
- GitHub: [Thibyaa Mahasivam](https://github.com/thibyaa) 


