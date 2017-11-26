import React from "react";
/**
 * recompose library to build map component according to 
 * react-google-maps documentation
 */
import { compose, withProps } from "recompose";
/**
 * react-google-maps export functions for display maps, markers, and marker functionality
 */
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

import { connect } from 'react-redux';



/**
 * @function myMapComponent
 * composed component from the 
 * react-google-maps npm library
 */
const MyMapComponent = compose(
  /**
   * creation of map component with inline div
   * styling for map container
   */
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYHgOUitMvtS5HncYdM762JAT54DMThX0&libraries=geometry,places,embed",    
    loadingElement: <div style={{ height: `100%`, width: '100vw'}} />,
    containerElement: <div style={{ height: `50vh`, width: '100vw'}} />,
    mapElement: <div style={{ height: `100%`, width: '100vw', marginTop: `10vh`}} />,
  }),
  /**
   * react-google-map premade functions for 
   * adding map functionality
   */
  withScriptjs,
  withGoogleMap,
)((props) => {
  /**
   * determing site location and latitude and longitude
   * passed in from the find_games, your_games, and 
   * post_game component
   */
  const { pathname } = props.location
  const {lat_long} = props.map_info
  const {selected_game} = props
  /**
   * using the app url pathname passed to the component to determine
   * which type of map to render, multiple markers and locations
   * or a single location and marker
   */
  if(pathname === '/post_game' || props.open_form) {
    let lat = selected_game ? selected_game.latitude : lat_long.lat || 34.043017
    let lng = selected_game ? selected_game.longitude : lat_long.lng || -118.267254
    let marker_label = selected_game ? selected_game.game_title:''

    return (
      <GoogleMap
      defaultZoom={19}
      center= {{ lat, lng }}>
        <MarkerWithLabel
        markerWithLabel={window.MarkerWithLabel}
        labelAnchor={new google.maps.Point(0, 0)}
        labelStyle={{
          backgroundColor: "rgba(0,0,0,0.8)", 
          fontSize: "10px", 
          padding: "6px",
          color: "white",
          maxWidth: "10vw",
          maxHeight: "15vh",
        }}
        position={{lat, lng}} >
          <div>{marker_label}</div>
        </MarkerWithLabel>
      </GoogleMap>
    )
  }

  /**
   * with the list of active games passed from the backend database
   * to build the list of markers for either the find games map 
   * or the your games map
   */
  if(pathname === '/find_game') {
    let lat = props.map_info.active_games.length > 0 ? props.map_info.active_games[0].latitude : 33.7175
    let lng = props.map_info.active_games.length > 0 ? props.map_info.active_games[0].longitude : -117.8311

    if(props.map_info.active_games) {
      const markers = props.map_info.active_games.map( (item, idx) => {
        let lat_lon = {lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}
        return (<MarkerWithLabel
          markerWithLabel={window.MarkerWithLabel}
          labelAnchor={new google.maps.Point(0, 0)}
          labelStyle={{
            backgroundColor: "rgba(0,0,0,0.8)", 
            fontSize: "10px", 
            padding: "6px",
            color: "white",
            maxWidth: "10vw",
            maxHeight: "15vh",
          }}
          key={idx} 
          position={lat_lon} 
          onClick={props.onMarkerClick}>
            <div>{`${item.city}, ${item.formatted_date}`}</div>
        </MarkerWithLabel>)
      })
      return (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={ {lat: 33.7175, lng: 117.8311}}
          center= {{ lat, lng }}>
          {markers}
        </GoogleMap>
      )
    }
  }

  if(pathname === '/your_games') {
    let lat = props.map_info.user_game_history.games.length > 0 ? props.map_info.user_game_history.games[0].latitude : 33.7175
    let lng = props.map_info.user_game_history.games.length > 0 ? props.map_info.user_game_history.games[0].longitude : -117.8311

    if(props.map_info.user_game_history) {
      const markers = props.map_info.user_game_history.games.map( (item, idx) => {
        let lat_lon = {lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}
        return (<MarkerWithLabel
            labelAnchor={new google.maps.Point(0, 0)}
            labelStyle={{
              backgroundColor: "rgba(0,0,0,0.8)", 
              fontSize: "10px", 
              padding: "6px",
              color: "white",
              maxWidth: "10vw",
              maxHeight: "15vh",
            }}
            key={idx} 
            position={lat_lon} 
            onClick={props.onMarkerClick}>
              <div>{`${item.city}, ${item.formatted_date}`}</div>
          </MarkerWithLabel>)
        
      })
      return (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={ {lat: 33.7175, lng: -117.8311}}
          center= {{ lat, lng }}>
          {markers}
        </GoogleMap>
      )
    }
  }
})

/**
 * @class
 * @classdesc react-google-maps class component from npm library
 * that creates a new Map with markers
 * 
 */

class MyFancyComponent extends React.PureComponent {
  /**
   * @function compnentDidMount
   * @classdesc Handling loading markers after map has loaded
   * @returns delayedShowMarker function call adding markers to map and marker click 
   */
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
        selected_game={this.props.selected_game}
        location={this.props.history.location}
        onMarkerClick={this.handleMarkerClick}
        map_info={this.props.lat_lon}
        open_form={this.props.open_form}
      />
    )
  }
}

/**
 * @function
 * @param { object } state - adding open_form to comp. for map kind determination
 *  @return an object with the state mapped to the MyFancyComponent props open_form and selection
 * added to props to update map with user changes
 */

function mapStateToProps(state) {
  return {
    open_form: state.sports.open_form,
    selection: state.sports.selection
  }
}

export default connect(mapStateToProps)(MyFancyComponent)