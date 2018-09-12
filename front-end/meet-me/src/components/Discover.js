import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Place from './Place'
import {Spin} from 'antd'
import {googleMapsApiKey} from '../ApiKey'

class Discover extends Component {
  
  state = {
    placeSuggestions: [],
    redirect: false,
    city: '',
    street: '',
    streetNumber: '',
    isLoading: true,
    showingSearchResults: false
  }

  componentDidMount() {
    if (localStorage.getItem('USERNAME') === null) {
      this.setState({
        redirect: true,
      })
    } else {
      let city = ''
      let street = ''
      let streetNumber = ''
      navigator.geolocation.getCurrentPosition((pos) => {
        let latlng = pos.coords.latitude + "," + pos.coords.longitude
        axios
          .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${googleMapsApiKey}`)
          .then((res) => {
            city = res.data.results[0].address_components[3].long_name
            street = res.data.results[0].address_components[1].short_name
            streetNumber = res.data.results[0].address_components[0].short_name
            axios
              .get(`http://localhost:8080/discover/${city}/${street}/${streetNumber}`)
              .then(response => {
                console.log(response.data)
                this.setState({
                  placeSuggestions: response.data.businesses,
                  isLoading: false,
                  streetNumber,
                  street,
                  city
                })
              })
          })
      })
    }
  }

  searchPlaces = (e) => {
    e.preventDefault()
    const form = e.target
    const searchTerms = {
      location: form.location.value,
      keyWord: form.searchTerm.value,
    }
    axios
      .get(`http://localhost:8080/discoverSearch/${searchTerms.location}/${searchTerms.keyWord}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          placeSuggestions: response.data.businesses,
          showingSearchResults: true
        })
      })
  }
  
  render() {
    if(this.state.redirect) return <Redirect to='/'/>
    const placeJSX = this.state.placeSuggestions.map((place, i) => {
      return <Place
        name = {place.name}
        address1 = {place.location.address1}
        city = {place.location.city}
        state = {place.location.state}
        zip = {place.location.zip_code}
        country = {place.location.country}
        image = {place.image_url}
        rating = {place.rating}
        phoneNumber = {place.phone}
        key = {i}
        price={place.price}
        addPlace={this.props.addPlace}
        />
    })
    const {streetNumber, street, city, showingSearchResults} = this.state
    return(
      <div className="discover-page">
        {this.state.isLoading ? <div className="discover-spin">{<Spin size="large" />}</div> :
        <div>
        {showingSearchResults ? <h4 className="discover-search-heading">Search Results</h4> :
        <div>
          <h5 className="discover-current-address">{streetNumber}, {street}, {city}</h5><img className="discover-location-icon" alt="" src="/location_on-24px.svg"/>
          <h4 className="discover-location-heading" >Showing places near you</h4>
        </div>
        }
        <form className="discover-form-search" onSubmit={(e) => {this.searchPlaces(e)}}>
          <input className="discover-search-textbox form-control" name="location" placeholder ="Add a location here"/>
          <input className="discover-search-textbox form-control" name="searchTerm" placeholder ="Add a search term here. (eg. coffee, bar)"/>
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
        <div className="discover-container">
          <div className="row justify-content-center">
            <div className="card-deck">       
              {placeJSX}
            </div>
          </div>
        </div>
        </div>
        }
      </div>
    )
  }
}

export default Discover