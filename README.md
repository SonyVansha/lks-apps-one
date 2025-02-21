# LKS APPS 01

> **Desc :** Deploy this apps to your aws. Create a scalable, available, reliable and secure infrastructure for this apps.

<hr>

## Client Config Setup
> Create .env file in Client root folder
```sh
API_URL=YOUR_API_BACKEND_SERVER_HOST # For example http://localhost:8000
API_EXAM_URL=YOUR_API_BACKEND_SERVER_HOST # For example http://localhost:9000/exam
```
## Running Client (Front End)
> Client service has two options for deployment.

### 1st Option - Server Deployment
```sh
# Firstly You need to run this command to create .nuxt directory with everything inside ready to start
$ npm run build 

# Start your client apps in server-side production mode
$ npm run start 

```
### 2nd Option - Static Deployment (Pre-rendered)
> Gives you the ability to host your web application on any static hosting, the static source code will be generated in *dist folder*
```sh
# Generate static source code
# Use --prefix <your_path> for specific path and use --quite or --slient for suppressing the output of npm
$ npm run generate

```

<hr>

## API Server Config Setup
> Create .env file in Server root folder
```sh
NODE_ENV=production
PORT=8000
DB_TYPE=YOUR_DATABASE_TYPE
MYSQL_DB=YOUR_MYSQL_DATABASE_NAME
MYSQL_USERNAME=YOUR_MYSQL_USERNAME
MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD
MYSQL_HOST=YOUR_MYSQL_HOST
MYSQL_PORT=YOUR_MYSQL_PORT
REDIS_HOST=YOUR_REDIS_HOST
REDIS_PORT=YOUR_REDIS_PORT
REDIS_PASSWORD=YOUR_REDIS_PASSWORD
AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS
AWS_ACCESS_KEY_SESSION_TOKEN=YOUR_AWS_ACCESS_KEY_SESSION_TOKEN
AWS_BUCKET_NAME=YOUR_AWS_BUCKET_NAME
LOG_PATH=YOUR_LOG_FOLDER_LOCATION
CACHE_PATH=YOUR_CACHE_PATH_FILE_LOCATION_STORE
```
## Running API Server (Private API)
```sh
# Start server on production mode
$ npm run start-prod 

# Stop server on production mode
$ npm run stop-prod 
```

<hr>

## Exam Service Config Setup
> Create .env file in Server root folder
```sh
NODE_ENV=production
PORT=9000 # If not set, default port is 9000
MONGO_USERNAME=YOUR_MONGO_USER
MONGO_PASSWORD=YOUR_MONGO_PASSWORD
MONGO_HOST=YOUR_MONGO_HOST
MONGO_PORT=YOUR_MONGO_PORT # Mongo port default is 27017
LOG_PATH=YOUR_LOG_FOLDER_LOCATION
CACHE_PATH=YOUR_CACHE_PATH_FILE_LOCATION_STORE
```

## Mongo-Redis Deployment
In creating redis and mongodb that are managed using docker. You can use docker compose to create both databases. In this environment, you use an Ubuntu instance to run docker.
Use the **docker-compose.yml** file located in `mongo-redis/docker-compose.yml` to create both databases. follow the instructions details in the mongo-redis/README.md.

## Exam API Endpoint
| API Endppint                               | Description                         | 
| ------------------------------------- | ----------------------------------- | 
| ***GET "http://exam.example.com/exam"*** | Entry API Endpoint. |
| ***GET "http://exam.example.com/exam/quiz"*** | Quiz data API Endpoint. |
| ***GET "http://exam.example.com/exam/init"*** | Create exam quiz dummy data. |
| ***GET "http://exam.example.com/exam/flush"*** | Flush exam quiz dummy data. |

API Endpoint [**link**](https://documenter.getpostman.com/view/32005248/2sAYdbPDUR)

## Running Exam Service (Public API)
```sh
# Start Exam Service on production mode
$ npm run start-prod 

# Stop Exam Service on production mode
$ npm run stop-prod 
```

<hr>
