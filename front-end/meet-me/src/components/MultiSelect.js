import React, {Component} from 'react'
import { Select } from 'antd'
import 'antd/dist/antd.css'

const Option = Select.Option;

class MultiSelect extends Component {
  
  render() {
    const usersJSX = this.props.users.map(user => {
      return <Option key={user.id}>{user.name}</Option>
    })
    return(
      <div className="multi-select-div">
        <Select
          mode="multiple"
          defaultValue={this.props.currentEventUserNames}
          // style={{ width: '100%' }}
          style={{ width: '100%', height: '50px' }}
          placeholder="Please select"
          onChange={this.props.usersChange}
          >
          {usersJSX}
        </Select>
      </div>
    )
  }
}

export default MultiSelect