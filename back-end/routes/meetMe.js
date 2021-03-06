const express = require('express')
const router = express.Router()
const MeetMeController = require('../controller/meetMe')

//Homepage Routes
router.post('/addUser', (req, res) => {
  MeetMeController
    .addUser(req.body)
    .then(user => res.json(user))
})

router.get('/getUsers', (req, res) => {
  MeetMeController
    .getUsers()
    .then(users => res.json(users))
})

router.delete('/place', (req, res) => {
  MeetMeController
    .deletePlace(req.body)
    .then(res.json("Success"))
})

//Profile Routes
router.get('/userProfile/:userId', (req, res) => {
  MeetMeController
    .getUserProfile(req.params)
    .then(userProfile => res.json(userProfile))
})

router.get('/calendar/:userId', (req, res) => {
  MeetMeController
    .getEvents(req.params)
    .then(events => res.json(events))
})

router.get('/event/:eventId', (req, res) => {
  MeetMeController
    .getEvent(req.params)
    .then(event => res.json(event))
})

router.post('/addEvent', (req, res) => {
  MeetMeController
    .postEvent(req.body)
    .then(event => res.json(event))
})

router.post('/updateEvent', (req, res) => {
  MeetMeController
    .updateEvent(req.body)
    .then(event => res.json(event))
})

router.delete('/deleteEvent', (req, res) => {
  MeetMeController
    .deleteEvent(req.body)
    .then(res.json("Success"))
})

//Discover Routes
router.get('/discover/:lat/:long', (req,res) => {
  MeetMeController
    .getSuggestedPlaces(req.params)
    .then(results => res.json(results.data))
})
router.get('/discoverSearch/:location/:keyWord', (req, res) => {
  MeetMeController
    .getSearchResults(req.params)
    .then(results => res.json(results))
})
router.get('/discoverSavedPlaces/:username', (req, res) => {
  MeetMeController
    .getSavedPlaces(req.params)
    .then(results => res.json(results))
})

//Your Places Routes
router.get('/places', (req, res) => {
  MeetMeController
    .getYourPlaces(req.params)
    .then(results => {
      res.json(results)
    })
})

router.post('/newPlace', (req, res) => {
  MeetMeController
    .addNewPlace(req.body)
    .then(results => {
      res.json(results)
    })
})

router.post('/preference', (req, res) => {
  MeetMeController
    .addPreference(req.body)
    .then(results => {
      res.json(results)
    })
})

router.delete('/preference', (req, res) => {
  MeetMeController
    .deletePreference(req.body)
    .then(results => {
      res.json(results)
    })
})

module.exports = router