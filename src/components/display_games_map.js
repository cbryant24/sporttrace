// import React, { Component } from 'react';
// import {
//     withScriptjs,
//     withGoogleMap,
//     GoogleMap,
//     Marker,
//   } from "react-google-maps";
// import { connect } from 'react-redux'


  
// const MapWithAMarker = withScriptjs(withGoogleMap (props => {
//   debugger
//   props
//     return (
//     <GoogleMap
//       defaultZoom={8}
//       defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//       <Marker
//         position={{ lat: -34.397, lng: 150.644 }} />
//       <Marker
//         position={{ lat: -34.197, lng: 150.644 }} />
//     </GoogleMap>
//   )
// }
// ));

// export default MapWithAMarker

import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { connect } from 'react-redux';

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYHgOUitMvtS5HncYdM762JAT54DMThX0&libraries=geometry,places,embed",    
    loadingElement: <div style={{ height: `100%`}} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%`, marginTop: `10vh`}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const { pathname } = props.location.location
  const {lat_long} = props.map_info  
  if(pathname === '/post_game') {
    let lat = lat_long.lat || 34.043017
    let lng = lat_long.lon || -118.267254

    return (
      <GoogleMap
      defaultZoom={15}
      center= {{ lat, lng }}>
        <Marker position={{ lat, lng }} onClick={props.onMarkerClick} />
      </GoogleMap>
    )
  }

  if(pathname === '/find_game') {
    let lat = props.map_info.active_games.length > 0 ? props.map_info.active_games[0].latitude : 33.7175
    let lng = props.map_info.active_games.length > 0 ? props.map_info.active_games[0].longitude : -117.8311

    if(props.map_info.active_games) {
      const markers = props.map_info.active_games.map( (item, idx) => {
        let lat_lon = {lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}
        return <Marker key={idx} position={lat_lon} onClick={props.onMarkerClick} />
      })
      return (
        <GoogleMap
          defaultZoom={5}
          defaultCenter={ {lat: 33.7175, lng: 117.8311}}
          center= {{ lat, lng }}>
          {markers}
        </GoogleMap>
      )
    }
  }

  if(pathname === '/your_games') {
    debugger
    let lat = props.map_info.user_game_history.games.length > 0 ? props.map_info.user_game_history.games[0].latitude : 33.7175
    let lng = props.map_info.user_game_history.games.length > 0 ? props.map_info.user_game_history.games[0].longitude : -117.8311

    if(props.map_info.user_game_history) {
      const markers = props.map_info.user_game_history.games.map( (item, idx) => {
        let lat_lon = {lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}
        return <Marker key={idx} position={lat_lon} onClick={props.onMarkerClick} />
      })
      return (
        <GoogleMap
          defaultZoom={5}
          defaultCenter={ {lat: 33.7175, lng: -117.8311}}
          center= {{ lat, lng }}>
          {markers}
        </GoogleMap>
      )
    }
  }
})

class MyFancyComponent extends React.PureComponent {
  // state = {
  //   isMarkerShown: false,
  // }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    console.log(this.props)
    return (
      <MyMapComponent
        location={this.props.history}
        onMarkerClick={this.handleMarkerClick}
        map_info={this.props.lat_lon}
      />
    )
  }
}

export default MyFancyComponent


// isMarkerShown={this.state.isMarkerShown}