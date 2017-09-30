import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
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
                    zoom={ 13 }
                    className={'googles mapping'} >
                    { marker_arr }
                </Map>
            </div>
        );
    }
}



export default GoogleApiWrapper({
    apiKey: 'AIzaSyDYHgOUitMvtS5HncYdM762JAT54DMThX0',
    version: '3.28'
})(MapContainer)



