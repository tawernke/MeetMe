const Event = require('../model/events')
const User = require('../model/users')
const Place = require ('../model/places')
const Preference = require ('../model/preferences')
const axios = require('axios')
const fs = require('fs')
const {yelpApiKey} = require ('./ApiKey')

const MeetMeController = {
  //Homepage controllers
  addUser: (newUser) => {
    const { username, name } = newUser
    return new Promise((resolve, reject) => {
      User
      const newUser = new User({
        username, name
      })
      newUser
        .save()
        .then(user => resolve(user))
    })
  },
  getUsers: () => {
    return new Promise((resolve, reject) => {
      User
        .fetchAll({})
        .then(users => {
          resolve(users.models.map(users => users.attributes))
        })
    })
  },
  deletePlace: (deletedPlaceId) => {
    return new Promise((resolve, reject) => {
      Place
      .forge({id: deletedPlaceId.placeId})
      .fetch({withRelated: ['users']})
      .then(place => {
        place.users().detach()
        place.destroy()
        resolve(place)
      })
    })
  },
  //Profile Controllers
  getUserProfile: (user) => {
    return new Promise((resolve, reject) => {
      new User()
        .where('username', user.username)
        .fetchAll({withRelated: ['places', 'preferences']})
        .then(users => {
          resolve(users.models.map(users => users))
        })
    })
  },
  
  getEvents: () => {
    return new Promise((resolve, reject) => {
      new Event()
        .fetchAll({withRelated: ['users']})
        .then(events => {
          resolve(events.models.map(events => events))
        })
    })
  },
  postEvent: (newEvent) => {
    return new Promise((resolve, reject) => {
      const user_ids = newEvent.users
      delete newEvent.users
      new Event(newEvent)
        .save()
        .then(event => {
          return event.users().attach(user_ids)
        })
        .then(()  => {
          new Event()
          .query(function(qb) {
            qb.orderBy('id', 'DESC')})
          .fetch({withRelated: ['users']})
          .then(event => resolve(event))
        })
    })
  },
  updateEvent: (updatedEvent) => {
    return new Promise((resolve, reject) => {
      const user_ids = updatedEvent.users
      delete updatedEvent.users
      Event
        .forge({id: updatedEvent.id})
        .save(updatedEvent)
        .then(event => {
          return event.users().attach(user_ids)
        })
        .then(()  => {
          new Event()
          .query(function(qb) {
            qb.orderBy('id', 'DESC')})
          .fetch({withRelated: ['users']})
          .then(event => resolve(event))
        })
    })
  },
  deleteEvent: (deletedEvent) => {
    return new Promise((resolve, reject) => {
      Event
        .forge({id: deletedEvent.eventId})
        .fetch({withRelated: ['users']})
        .then(event => {
          event.users().detach()
          event.destroy()
          resolve(event)
        })
    })
  },

  //Discover Controllers
  getSuggestedPlaces: (currentLocation) => {
    return new Promise((resolve, reject) => {
    const config = {
      headers: {'Authorization': 'Bearer ' + yelpApiKey}
    }
    axios
      .get(`http://api.yelp.com/v3/businesses/search?location=${currentLocation.streetNumber},${currentLocation.street},${currentLocation.city}`, config)
      .then(results => resolve(results))
    })
  },
  getSearchResults: (searchParams) => {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + yelpApiKey
        }
      }
      axios
        .get(`http://api.yelp.com/v3/businesses/search?term=${searchParams.keyWord}&location=${searchParams.location}`, config)
        .then(results => resolve(results.data))
      })
  },

  getSavedPlaces: (user) => {
    console.log(user)
    return new Promise((resolve, reject) => {
      new User()
        .where('username', user.username)
        .fetchAll({withRelated: ['places']})
        .then(users => {
          resolve(users.models.map(users => users.relations))
        })
    })
  },

  //Your Places Controllers
  getYourPlaces: (currentUser) => {
    return new Promise((resolve, reject) => {
      new Place()
        .fetchAll()
        .then(places => {
          resolve(places.models.map(places => places.attributes))
        })
    })
  },

  addNewPlace: (newPlace) => {
    return new Promise((resolve, reject) => {
      const user_id = newPlace.user_id
      delete newPlace.user_id
      new Place(newPlace)
        .save()
        .then(place => {
          place.users().attach(user_id)
          resolve(place)
        })
    })
  },

    addPreference:(newPreference) => {
      return new Promise((resolve, reject) => {
        const user_id = newPreference.id
        delete newPreference.id
        new Preference(newPreference)
          .save()
          .then(preference => {
            preference.users().attach(user_id)
            resolve(preference)
          })
          // .then(preference => resolve(preference))
      })
    },

    deletePreference:(newPreference) => {
      console.log(newPreference)
      return new Promise((resolve, reject) => {
        Preference
          .forge({id: newPreference.preferenceId})
          .fetch({withRelated: ['users']})
          .then(preference => {
            preference.users().detach()
            preference.destroy()
            resolve(preference)
          })
      })
    },
}

module.exports = MeetMeController