import React, { Component } from 'react'
import Favourites from './Favourites'
import ToDos from './ToDos'
import Preferences from './Preferences'
import PlacesModal from './PlacesModal'
import { Tabs, Icon, Upload, message } from 'antd'
import axios from 'axios'

const TabPane = Tabs.TabPane

class YourPlaces extends Component {

  state = { 
    visible: false,
    place: {},
    isLoading: true,
    imageUrl: '',
    username: 'username'  
  }

getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

  beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

  uploadProfile = (e) => {
    e.preventDefault()
    let data = new FormData()
    data.append('profile', e.target.profile.files[0])
    data.append('username', this.state.username)
    axios.post('http://localhost:8080/profilePicture', data)
      .then(response => {
        console.log(response.data)
      })
  }

  showModal = (placeId) => {
    const clickedPlace = this.props.currentUser[0].places.filter(place => {
        return place.id === placeId
      })
    console.log(clickedPlace[0])
    this.setState({
      visible: true,
      place: clickedPlace[0],
      isLoading: false
    })
  }

  callback = (key) => {
    console.log(key)
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const profileToDos = this.props.currentUser[0].places.filter(place => {
      return place.type === 'todo'
    })
    const profileFavourites = this.props.currentUser[0].places.filter(place => {
      return place.type === 'favourite'
    })
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl
    return(
      <div>
        <PlacesModal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          place={this.state.place}
          isLoading={this.state.isLoading}
        />
        {this.props.currentUser[0].username === 'tawernke' ? <img className="profile-picture" src="./Tim_Wernke.jpg"/> :
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
        }
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab={<span><Icon type="star" />To Try</span>} key="1">
            <ToDos 
            toDoPlaces={profileToDos}
            addPlace={this.props.addPlace}
            showModal={this.showModal}
            />
          </TabPane>
          <TabPane tab={<span><Icon type="heart" />Favourites</span>} key="2">
            <Favourites 
            favouritePlaces={profileFavourites}
            addPlace={this.props.addPlace}
            showModal={this.showModal}
            />
          </TabPane>
        </Tabs>
        <Preferences
          currentUser={this.props.currentUser}
          />
      </div>
    )
  }
}

export default YourPlaces