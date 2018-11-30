# MeetMe

MeetMe is a social callendar that let's you see what others are up to, let's others see what you have going on, and then uses that information to help plan your next hangout. It even lists restaurants, bars, etc that others like and helps you discover exciting new places

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

The dependencies for both the front-end and back-end will need to be installed by navigating to the directory and using npm or yarn

### Creating the database

A SQL database will need to be created locally, then a migraion run to create the tables. Once a database has been created, open the knexfile.js file and add the configuration settings of the database created.

After enetering the config settings, navigate to the back-end directory and run the below command to run the database migration

```
npm run migrate
```

### Environment variables

In the root of the back-end directory is a template .env file that will need to be filled in with a Yelp API key. A Yelp API key can be obatined using the instruction [here](https://www.yelp.ca/developers/documentation/v3/authentication)

## Running the app

Once the database is all setup and the environment variables set, the app can be started by navigating to the back-end directory then running the following command, then navigating to the front-end directory and runnig the same command.

```
npm start
```

## Built With

* React
* Node
* Express
* PostgreSQL
* [Yelp Fusion API](https://www.yelp.com/fusion)
* [FullCallendar](https://fullcalendar.io/) - A javascript callendar
* [Ant Design](https://ant.design/) - React UI component library