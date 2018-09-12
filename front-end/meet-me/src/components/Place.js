import React, { Component } from 'react'
import { Icon} from 'antd'

class Place extends Component {

  addPlaceType = (placeType, id) => {
    console.log(placeType)
    const {name, address1, city, state, country, zip, image, rating, phoneNumber} = this.props
    const newToDo = {
      name: name,
      address_1: address1,
      city: city,
      state: state,
      country: country,
      zip_code: zip,
      image: image,
      rating: rating.toString(),
      phone: phoneNumber,
      type: placeType
    }
    this.props.addPlace(newToDo)
  }

  syleBefore = {
    fontSize: '25'

  }

  styleAfter = {

  }

  render() {
    const {name, address, image, rating, phoneNumber, price, id} = this.props
    return(
      <div className="justify-content-center col-xl-3 col-lg-4 col-sm-6 col-xs-12 discover-card">
        <div className="card">
            <img className="card-img-top" src={image} alt=''/>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{address} </p>
                <p className="card-text">{phoneNumber} </p>
                <p className="card-text">Rating: {rating} </p>
                <p className="card-text">Price: {price} </p>
                {/* <Icon type="star-o" style={{ fontSize: 25, color: '#FDBE34' }}onClick={() => this.addPlaceType('todo')}/>
                <Icon type="heart-o" style={{ fontSize: 25, color: '#BC1D35' }} onClick={() => this.addPlaceType('favourite')}/> */}
                <Icon className="discover-placeIcon" type="star" style={{ fontSize: 25, color: '#FDBE34' }}onClick={() => this.addPlaceType('todo')}/>
                <Icon className="discover-placeIcon" type="heart" style={{ fontSize: 25, color: '#BC1D35' }} onClick={() => this.addPlaceType('favourite')}/>
            </div>
        </div>
      </div>
    )
  }
}

export default Place

