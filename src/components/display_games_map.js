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
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYHgOUitMvtS5HncYdM762JAT54DMThX0&libraries=geometry,places",    
    loadingElement: <div style={{ height: `100%`}} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%`, top: `20.8%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  console.log('props from the map comp::', props)
  let lat = props.map_info.lat_long.lat || 33.552085 ;
  let lng = props.map_info.lat_long.lon || -117.666035;
  // if(props.map_info.lat_long) {
  //   lat = props.map_info.lat_long.lat;
  //   lng = props.map_info.lat_long.lon;
  // }
  if(props.map_info.active_games ) {
    const markers = props.map_info.active_games.map( (item, idx) => {
      let lat_lon = {lat: item.latitude, lng: item.longitude}
      return <Marker key={idx} position={lat_lon} onClick={props.onMarkerClick} />
    })
    return (
      <GoogleMap
      defaultZoom={7}
      defaultCenter={ {lat: 33.7175, lng: 117.8311}}
      center= {{ lat, lng }}>
      {markers}
    </GoogleMap>
    )
  }
  
  return (
    <GoogleMap
      defaultZoom={15}
      center= {{ lat, lng }}>
      <Marker position={{ lat, lng }} onClick={props.onMarkerClick} />
    </GoogleMap>
  )
}
)

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
    return (
      <MyMapComponent
        onMarkerClick={this.handleMarkerClick}
        map_info={this.props.lat_lon}
      />
    )
  }
}

export default MyFancyComponent


// isMarkerShown={this.state.isMarkerShown}