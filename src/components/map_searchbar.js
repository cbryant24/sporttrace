import React, { Component } from 'react'
// import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { connect } from 'react-redux';
import { update_lat_long } from '../actions';
import {Field, reduxForm} from 'redux-form';


const MapWithASearchBox = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDYHgOUitMvtS5HncYdM762JAT54DMThX0&libraries=geometry,places,embed',
    loadingElement: <div/>,
    containerElement: <div/>,
    mapElement: <div className='test' style={{ height: `0%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          if(places[0].address_components) {
            let i = 0;            
            while(i < places[0].address_components.length) {
              if(places[0].address_components[i].types[0] === 'postal_code'){
                var zipcode = places[0].address_components[i].short_name
              }
              i++
            }
            this.props.update_lat_long({
              lat: places[0].geometry.viewport.f.b,
              lon: places[0].geometry.viewport.b.b,
              zipcode,
              address: places[0].adr_address,
              place_id: places[0].place_id,
              city: places[0].vicinity || 'City Unknown'
            })
          }
          

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <div>
    <label>Location</label>
    <StandaloneSearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    controlPosition={12}
    onPlacesChanged={ () => props.onPlacesChanged()}>
    <input
        type="text"
        placeholder="Address"
        className='form-control' />
    
    </StandaloneSearchBox>
  </div>
);

function mapStateToProps(state) {
    return {
        lat_long: state.sports.lat_long
    }
}


export default connect(mapStateToProps, { update_lat_long })(reduxForm({
  form: 'post game form'
})(MapWithASearchBox))

