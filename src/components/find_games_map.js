import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, onReady, Listing } from 'google-maps-react';
import logo2 from '../assets/img/logo2.png';
import stylebruh from '../assets/css/sportsfinder.css';

export class MapContainer extends Component {
    render() {
        const style = {
            width: '100vw',
            height: '49vh'
        }
        const marker_arr = this.props.active_games.map((item, idx) => {
            let lat_lon = { lat: item.latitude, lng: item.longitude}
            return <Marker key={idx} position={lat_lon}/>
        })
        return (
            <div className='game-map'>
                <Map google={ this.props.google }
                    clickableIcons={ false }
                    style={ style }
                    zoom={ 10 }
                    initialCenter={{
                    lat: 34.043017,
                    lng: -118.267254
                    }}
                    className={'googles mapping'} >
                    { marker_arr }
                </Map>
            </div>
        );
    }
}

class Fetch_Places extends Component {
    render() {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        return (
            <Map google={this.props.google}
                onReady={this.fetchPlaces}
                visible={false}>
                <Listing places={this.state.places} />
            </Map>
                
        )

    }
}


export const GoogleMapWrapper = GoogleApiWrapper({
    apiKey: 'AIzaSyDYHgOUitMvtS5HncYdM762JAT54DMThX0',
    version: '3.28'
})(MapContainer)

export const Fetch_All_Places = GoogleApiWrapper({
    apiKey: 'AIzaSyDYHgOUitMvtS5HncYdM762JAT54DMThX0',
    version: '3.28'
})(Fetch_Places)


