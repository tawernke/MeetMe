import React, {Component} from 'react'
import moment from 'moment'
import MultiSelect from './MultiSelect'
import { DatePicker } from 'antd'
import { TimePicker } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'

class EventDetails extends Component {

  state = {
    eventDetails: {}
  }

  componentDidMount() {
    // let startDate = this.props.state.currentEvent.start
    // if (!startDate) {
    //   startDate = moment(this.props.state.selectedDate).format()
      
    // }
    axios
      .get(`http://localhost:8080/event/${Number(this.props.match.params.eventId)}`)
      .then(results => {
        const defaultUserNames = results.data.users.map(user => {
          return user.name
        })
        console.log(results.data)
        this.setState({
          eventDetails: results.data,
          userNames: defaultUserNames,
        })
      })
  }
  
  render() {
    const {location, start, end, title, description} = this.state.eventDetails
    const {deleteEvent, cancelEventUpdate} = this.props
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
              <p>From:</p>
              <DatePicker 
                onChange={this.props.dateChange}
                defaultValue={moment(start, 'YYYY-MM-DD')}
                />
              <TimePicker 
                use12Hours format="h:mm a" 
                onChange={this.props.timeChange}
                minuteStep={30}
                defaultValue={moment(start, 'HH:mm')}
                />
            </div>
            <div className="col">
              <p>To:</p>
              <DatePicker 
                onChange={this.props.dateChange}
                defaultValue={moment(end, 'YYYY-MM-DD')}
              />
              <TimePicker 
                use12Hours format="h:mm a" 
                onChange={this.props.timeChange}
                minuteStep={30}
                defaultValue={moment(end, 'HH:mm')}
              />
            </div>
          </div>
          <div className="row user-select">
            <div className="col">
              <p>Select Users:</p>
              <MultiSelect 
                users={this.props.users}
                currentEventUserNames={this.state.userNames}
                selectedUsers={this.props.selectedUsers}
                eventUsers={this.state.eventDetails.users}
                />
            </div>
            <div className="col">
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-danger" onClick={deleteEvent}>Delete</button>
            </div>
            <div className="col">
              <button className="btn btn-primary">Save</button>
            </div>
            <div className="col">
              <button className="btn btn-secondary" onClick={cancelEventUpdate}>Cancel</button>
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

