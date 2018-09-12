import React, { Component } from 'react'
import FullCalendar from 'fullcalendar-reactwrapper'
import {Route, Switch} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import EventDetails from './EventDetails'
import YourPlaces from './YourPlaces'
import '../fullcalendar.min.css'
import '../App.css'
import { Spin } from 'antd'

const usernameStorageKey = 'USERNAME'

class Profile extends Component {
  
  state = {
    selectedDate: "",
    currentEvent: {},
    events: [],
    userDetailsAndPlaces: {},
    isLoading: true,
    currentUser: {},
    redirect: false,
    selectedUsers: []
  }

  componentDidMount() {
    console.log('here')
    if (localStorage.getItem('USERNAME') === null) {
      this.props.history.push('/')
    }
    axios
      .get(`http://localhost:8080/userProfile/${this.props.match.params.username}`)
      .then(response => {
        this.setState({
          userDetailsAndPlaces: response.data,
          isLoading: false
        })
      })
    if (localStorage.getItem('USERNAME') !== null) {
      const loggedInUser = JSON.parse(localStorage.getItem(usernameStorageKey))
      axios.get('http://localhost:8080/calendar')
        .then(response => {
          const currentUserEvents = response.data.filter(event => {
            let foundUser = event.users.findIndex(user => {
              return user.username === this.props.match.params.username
            })
            return foundUser !== -1
          })
          this.setState({
            events: currentUserEvents,
            currentUser: loggedInUser
          })
        })
      }
  }

  eventClick = (calEvent) => {
    this.props.history.push(`${this.props.match.url}/event/${calEvent.id}`)
    this.state.events.forEach(event => {
      if(event.id === calEvent.id) {
        this.setState({
          currentEvent: event,
        })
      }
    })

    // Event time: ${calEvent.start.format("h:mm a")}
    }

  handleChange = (value) => {
    this.setState({
      selectedUsers: value
    },() => console.log(this.state.selectedUsers))
  }

  addEvent = (e) => {
    e.preventDefault()
    // let usersArray = [this.state.currentUser] USE THIS IF YOU WANT THE CURRENT USER BY DEFAULT
    let eventUserIds = this.state.selectedUsers.map(userId => {
      return parseInt(userId, 10)
    })
    const form = e.target
    const newEvent = {
      title: form.title.value,
      start: form.startDate.value + 'T' + form.startTime.value + ':00',
      end: "",
      location: form.location.value,
      description: form.description.value,
      users: eventUserIds,
      allDay: false
    }
    console.log(newEvent)
    if(!this.state.currentEvent.id) {
      axios
        .post('http://localhost:8080/addEvent', newEvent)
        .then(response => {
          let newEvents = [...this.state.events]
          newEvents.push(response.data)
          this.setState({
            events: newEvents,
            isLoading: false
          }, () => this.props.history.push(this.props.match.url))
        })
    } else {
      const newState = [...this.state.events]
      const pos = newState.findIndex((event, i) => {
        return event.id === this.state.currentEvent.id
      })
      newState[pos] = newEvent
      newState[pos].id = this.state.currentEvent.id
      console.log(newState[pos])
      axios
        .post('http://localhost:8080/updateEvent', newState[pos])
        .then(console.log('success'))
      this.setState({
        toEventDetails: false,
        events: newState
      })
    }
  }

  deleteEvent = () => {
    const deletedEventId = this.state.currentEvent.id
    const remainingEvents = this.state.events.filter(event => event.id !== deletedEventId)
    let userIdsArray = []
    this.state.currentEvent.users.forEach(user => {
      userIdsArray.push(user.id)
    })
    const deleteObj = {}
    deleteObj.eventId = deletedEventId
    deleteObj.userIds = userIdsArray
    this.setState({
      events: remainingEvents,
      currentEvent: {}
    }, () => this.props.history.push(this.props.match.url))
    axios.delete('http://localhost:8080/deleteEvent', {data: deleteObj})
      .then(response => {
        console.log(response)
      })
  }

  dayClick = (date) => {
    this.props.history.push(this.props.match.url + '/event/newEvent')
    this.setState ({
      selectedDate: moment(date)
    }, () => console.log(this.state.selectedDate))
  }
  
  render() {
    return(
      <div className="entire-profile">
        {this.state.isLoading ? <div className="profile-spin">{<Spin size="large" />}</div> :
        < div className = "profile-yourPlaces" >
        <h1>Meet {this.state.userDetailsAndPlaces[0].name}</h1>
          <YourPlaces
            currentUser={this.state.userDetailsAndPlaces}
            addPlace={this.addPlace}
            showModal={this.props.showModal}
            />
        </div>
        }
        <div className="profile-main">
          <Switch/>
              <Route
                path={this.props.match.url + "/event/:eventId"}
                render={(routeProps) => <EventDetails
                  addEvent={this.addEvent}
                  state={this.state}
                  deleteEvent={this.deleteEvent}
                  users={this.props.users}
                  currentUser={this.props.currentUser}
                  {...routeProps}
                  selectedDate={this.selectedDate}
                  handleChange={this.handleChange}
                  
                />}
              />
              <Route
                exact path={this.props.match.url}
                render={() => <FullCalendar
                  id = "your-custom-ID"
                  header = {{
                    left: 'prev,next today myCustomButton',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                  }}
                  defaultDate={'2018-08-24'}
                  navLinks= {true} // can click day/week names to navigate views
                  editable= {true}
                  eventLimit= {true} // allow "more" link when too many events
                  events = {this.state.events}// events filtered by the current logged on user go here!!!!!!!
                  eventClick = {this.eventClick}
                  dayClick={this.dayClick}
                  se
                />}
              />
          <Switch/>
        </div>
    </div>
    )
  }
}


export default Profile
