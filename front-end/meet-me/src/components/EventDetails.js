import React, {Component} from 'react'
import moment from 'moment'
import MultiSelect from './MultiSelect'

class EventDetails extends Component {

  state = {
    currentEventUsers: []
  }

  componentDidMount() {
    let startDate = this.props.state.currentEvent.start
    const currentEventUsers = this.props.state.currentEvent.users.map(user => {
      return user.name
    })
    this.setState({
      currentEventUsers: currentEventUsers
    })
    if (!startDate) {
      startDate = moment(this.props.state.selectedDate).format()
      console.log(moment(startDate).format('YYYY-MM-DD'))
    }
  }
  
  render() {
    let {title, start, location, description} = this.props.state.currentEvent
    return (
      <div className="eventDetails">
        {
        this.props.state.isLoading ? <h1>Loading...</h1> :
        <div>
        <h1>Event Creation</h1>
        <form onSubmit = {(e) => {this.props.addEvent(e)}}>
          <div className="row">
            <div className="col">
              <p>Title:</p>
              <input name="title" className="form-control placeholder-text" defaultValue={title} placeholder ="Add title Here"/>
            </div>
            <div className="col">
              <p>Location:</p>
              <input name="location" className="form-control placeholder-text" defaultValue={location} placeholder = "Add location Here"/>
            </div>
          </div>
          <div className="row">
            <div className="col">
            <p>Description:</p>
              <input name="description" className="form-control placeholder-text" defaultValue={description} placeholder = "Add a description Here"/>
            </div>
            <div className="col">
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Date:</p>
              <input name="startDate" placeholder = "Add the dat here" className="form-control placeholder-text" defaultValue={start} />
            </div>
            <div className="col">
              <p>Time:</p>
              <select name="startTime" className="custom-select placeholder-text" value={this.props.arrayOfOptionValues} onChange={this.handleChange}>
                <option value="12:00">12:00pm</option>
                <option value="12:30">12:30pm</option>
                <option value="13:00">1:00pm</option>
                <option value="13:30">1:30pm</option>
                <option value="13:00">2:00pm</option>
                <option value="13:30">2:30pm</option>
                <option value="13:00">3:00pm</option>
                <option value="13:00">3:30pm</option>
                <option value="13:00">4:00pm</option>
                <option value="13:30">4:30pm</option>
                <option value="13:00">5:00pm</option>
                <option value="13:30">5:30pm</option>
                <option value="13:00">6:00pm</option>
                <option value="13:30">6:30pm</option>              </select>
            </div>
          </div>
          <div className="row user-select">
            <div className="col">
              <p>Select Users:</p>
              <MultiSelect 
                users={this.props.users}
                currentUser={this.props.state.currentUser}
                handleChange={this.props.handleChange}
                currentEventUserNames={this.state.currentEventUsers}
                />
            </div>
            <div className="col">
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-danger" onClick={this.props.deleteEvent}>Delete</button>
            </div>
            <div className="col">
            </div>
            <div className="col">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
            </div>
          </div>
          <div className="row">
            <div className="col">
            </div>
          </div>
        </form>
        </div>
        }
      </div>
    )
  }
}

export default EventDetails

