# MeetMe

MeetMe is a social callendar that let's you see what others are up to, let's others see what you have going on, and then uses that information to help plan your next hangout. It even lists restaurants, bars, etc that others like and helps you discover exciting new places

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

The dependencies for both the front-end and back-end will need to be installed by navigating to the directory and using npm or yarn

Eg.

```
npm i
```

### Environment variables

In the root of the back-end directory is a template .env file that will need to be filled in with a Yelp API key and some database settings. 

A Yelp API key can be obatined using the instruction [here](https://www.yelp.ca/developers/documentation/v3/authentication)

The database variables are used to populate the knex.js file.

## Built With

Technologies used:
* React
* Node
* Express
* PostgreSQL
* [FullCallendar](https://fullcalendar.io/) - A javascript callendar
* [Ant Design](hhttps://ant.design/) - React UI component library