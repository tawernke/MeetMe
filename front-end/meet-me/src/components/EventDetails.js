import React, {Component} from 'react'
import moment from 'moment'
import MultiSelect from './MultiSelect'
import { DatePicker } from 'antd'
import { TimePicker } from 'antd'
import 'antd/dist/antd.css'

class EventDetails extends Component {

  componentDidMount() {
    let startDate = this.props.state.currentEvent.start
    if (!startDate) {
      startDate = moment(this.props.state.selectedDate).format()
      console.log(moment(startDate).format('YYYY-MM-DD'))
    }
  }

  addUsers = () => {
    
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
              <DatePicker 
                onChange={this.props.dateChange}
                defaultValue={moment(this.props.state.selectedDate, 'YYYY-MM-DD')}
                />
            </div>
            <div className="col">
              <p>Time:</p>
              <TimePicker 
                use12Hours format="h:mm a" 
                onChange={this.props.timeChange}
                minuteStep={30}
                defaultValue={moment(this.props.state.selectedDate, 'HH:mm')}
                />
            </div>
          </div>
          <div className="row user-select">
            <div className="col">
              <p>Select Users:</p>
              <MultiSelect 
                users={this.props.users}
                currentUser={this.props.state.currentUser}
                usersChange={this.props.usersChange}
                currentEventUserNames={this.props.state.currentEventUsers}
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
              <button className="btn btn-primary">Save</button>
            </div>
            <div className="col">
              <button className="btn btn-secondary" onClick={this.props.cancelEventUpdate}>Cancel</button>
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

