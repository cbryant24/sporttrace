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
import { update_lat_long } from '../actions'

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDYHgOUitMvtS5HncYdM762JAT54DMThX0&libraries=geometry,places',
    loadingElement: <div style={{ height: `0%` }} />,
    containerElement: <div style={{ height: `0px` }} />,
    mapElement: <div style={{ height: `0%` }} />,
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
            this.props.update_lat_long({
                lat: places[0].geometry.viewport.f.b,
                lon: places[0].geometry.viewport.b.b,
                zipcode: places[0].address_components[8].short_name
                })

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
  <StandaloneSearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    controlPosition={12}
    onPlacesChanged={ () => props.onPlacesChanged()}>
    <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
            color: 'black',
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
        }}
  />
    </StandaloneSearchBox>
</div>
  
);

function mapStateToProps(state) {
    return {
        update_lat_long: state.sports.update_lat_long
    }
}


export default connect(mapStateToProps, { update_lat_long })(MapWithASearchBox)