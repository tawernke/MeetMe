const express = require('express')
const router = express.Router()
const MeetMeController = require('../controller/meetMe')
const cors = require('cors')
const bodyParser = require('body-parser')
const upload  = require('multer')({ dest: 'tmp/uploads/' })


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

//Profile Routes
router.get('/userProfile/:username', (req, res) => {
  MeetMeController
    .getUserProfile(req.params)
    .then(userProfile => res.json(userProfile))
})

router.get('/calendar', (req, res) => {
  MeetMeController
    .getEvents()
    .then(events => res.json(events))
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
router.get('/discover/:city/:street/:streetNumber', (req,res) => {
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

router.post('/profilePicture', upload.single('profile'), (req, res) => {
  MeetMeController
    .uploadProfilePhoto(req.file)
})

module.exports = router