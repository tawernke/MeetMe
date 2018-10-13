import React, {Component} from 'react'
import { Select } from 'antd'
import 'antd/dist/antd.css'

const Option = Select.Option;

const testUsers = ["tim", "elsie", 'another one']

class MultiSelect extends Component {

  state = {
    isLoading: true
  }
  
  render() {
    const usersJSX = this.props.users.map(user => {
      return <Option key={user.id}>{user.name}</Option>
    })
    return(
      <div className="multi-select-div">
        <Select
          mode="multiple"
          // notFoundContent='Has not loaded'
          defaultValue={testUsers}
          // style={{ width: '100%' }}
          style={{ width: '100%', height: '50px' }}
          placeholder="Please select"
          onChange={this.props.handleChange}
          >
          {usersJSX}
        </Select>
      </div>
    )
  }
}

export default MultiSelect