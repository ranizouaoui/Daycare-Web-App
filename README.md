# Daycare Web App

## Overview
Welcome to the Daycare Web Application project. This web application is developed using Vue.js, Vite, and Firebase to provide a modern and efficient solution for managing daycare activities and information. This web application allows parents and daycare administrators to manage children's information, daily activities, special events, and much more.

## Features
- <strong> User Registration and Login:</strong> Authentication via Firebase.
- <strong>Child Management:</strong> Add, edit, and delete child information.
- <strong>Activity Calendar:</strong> View and manage daily daycare activities.
- <strong>Real-time Notifications:</strong> Receive real-time updates and notifications via Firebase.
  
 ## Manual Setup

 <blockquote>
<p dir="auto">Make sure Docker is installed.</p>
</blockquote>

<blockquote> <p dir="auto">You need to update the API file with your settings in <strong> frontend>src>api </strong> </p></blockquote>
<p dir="auto">Spin up the containers</p>

```
# Clone the repository
git clone https://github.com/your-username/daycare-web-app.git

# Navigate to the project directory
cd daycare-web-app

docker-compose up -d --build
```
Running the command will expose 3 services with the following ports:
<ul dir="auto">

<li><strong>Prometheus</strong> - <code>:9090</code></li>
<li><strong>Frontend</strong> - <code>:80</code></li>
<li><strong>grafana</strong> - <code>:3000</code></li>
</ul>

You can now access the server at http://localhost/ .

## App preview

<div align="center"> 
<img src="https://github.com/ranizouaoui/Garderie/blob/main/frontend/src/assets/home.png" alt="" />
 </div>
 <div align="center"> 
<img src="https://github.com/ranizouaoui/Garderie/blob/main/frontend/src/assets/home-user.png" alt="" />
 </div>
  <div align="center"> 
<img src="https://github.com/ranizouaoui/Garderie/blob/main/frontend/src/assets/emploi.png" alt="" />
 </div>
 
 ## Want more details?
 
 For more details or if you want to recommend me for other projects. Just contact me on my email: <strong> ranizouaouicontact@gmail.com </strong>
