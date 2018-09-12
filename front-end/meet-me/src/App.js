import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Profile from './components/Profile'
import Discover from './components/Discover'
import {Route, Switch, withRouter} from 'react-router-dom'
import axios from 'axios'
import './App.css'

const usernameStorageKey = 'USERNAME'

class App extends Component {
  
  state = {
    redirect: false,
    users: [],
    loggedInUser: {},
    imageChange: false,
  }

  styleBefore={
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "noRepeat",
    backgroundSize: "cover",
    backgroundImage: 'url(/cheers.jpg)'
}
  
  styleAfter={

  }
  componentDidMount() {
    const loggedInUser = JSON.parse(localStorage.getItem(usernameStorageKey))
    axios
      .get('http://localhost:8080/getUsers')
      .then(response => {
        this.setState({
          users: response.data,
          waitingForUsers: false,
          loggedInUser
        })
      })
  }

  addPlace = (newPlace) => {
    const loggedInUserId = JSON.parse(localStorage.getItem(usernameStorageKey)).id
    newPlace.user_id = [loggedInUserId]
    console.log(newPlace)
    axios
      .post('http://localhost:8080/newPlace', newPlace)
  }
  
  addUser = (e) => {
    e.preventDefault()
    const newUser = {
      username: e.target.username.value,
      name: e.target.name.value
    }
    const existingUser = this.state.users.find(user => {
      return user.username.toLowerCase() === newUser.username.toLowerCase()
    })
    if(existingUser) {
      localStorage.setItem(usernameStorageKey, JSON.stringify(existingUser))
      this.props.history.push(`/${existingUser.username}`)
      this.setState({
        imageChange: true
      })
    }
    else {
      axios
        .post('http://localhost:8080/addUser', newUser)
        .then(response => {
          localStorage.setItem(usernameStorageKey, JSON.stringify(response.data))
          this.setState({
            loggedInUser: response.data,
            imageChange: true
          }, () => window.location.reload())
        })
    }
  }

  logOut = () => {
    this.setState({
      currentUser: {}
    }, () => localStorage.removeItem(usernameStorageKey))
    window.location.reload()
  }
  
  render() {
    const {loggedInUser, imageChange} = this.state
    return(
      <div className="entire-app" style={!loggedInUser && !imageChange ? this.styleBefore : this.styleAfter}>
      <Navbar 
        logOut={this.logOut}
        users={this.state.users}
        history={this.props.history}
      />
      <div className="app">
        <Switch>
          <Route 
          exact path='/' 
          render={() => <Homepage
            addUser={this.addUser}
            logout={this.logout}
            loggedInUser={this.state.loggedInUser}
            />}
          />
          <Route
            path='/discover'
            render={() => <Discover
              addPlace={this.addPlace}
            />}
          />
          <Route
            path='/:username'
            render={(routeProps) => <Profile
              {...routeProps}
              { ...this.state}
              showModal={this.showModal}
            />}
          />
        </Switch>
      </div>
      </div>
    )
  }
}

export default withRouter (App)
