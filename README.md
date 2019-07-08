Holiday Extras Coding Task
==========================

User API
========

# Docker

The easiest way to run the API is to use Docker. A docker-compose file is provided as part of this project for convienience. The docker-compose creates a container that is running a node process and mariadb.

1. Copy `.env-sample` to `.env`. The values in the created `.env` will work with the docker configuration.
2. Run `docker-compose build`.
3. Run `docker-compose up` this will start the container running. If successful you should see a message saying `App listening on port 3000!`
4. Use the attached postman collection to make requests to the API.

# Manual Setup

Alternatively instead of using Docker you can run the API manually. You will need `node 10` installed and `mariadb` running. 

1. Run `npm install`.
2. Create the database schema in your mariadb instance using the `schema.sql` in this repo.
3. Populate `.env` file with values for your mariadb instance.
4. Run `npm start`
5. Use the attached postman collection to make requests to the API.

Unit Tests
==========

Run `npm tests` to run unit tests.