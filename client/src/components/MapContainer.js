import React, { Fragment, Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

export class MapContainer extends Component {
    state =
        {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.placesArray === nextProps.placesArray && this.state.showingInfoWindow === nextState.showingInfoWindow && this.state.selectedPlace === nextState.selectedPlace) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        // console.log("props: ", this.props);

        const style =
        {
            width: '40%',
            height: '70%'
        }

        let bounds = new this.props.google.maps.LatLngBounds();

        for (let i = 0; i < this.props.locationsObjArray.length; i++) {
            bounds.extend(this.props.locationsObjArray[i]);
        }

        return (
            <Fragment>
                <Map
                    google={this.props.google}
                    zoom={4}
                    style={style}
                    initialCenter=
                    {
                        {
                            lat: 37.09024,
                            lng: -95.712891
                        }
                    }
                    center=
                    {
                        {
                            lat: this.props.centerLat,
                            lng: this.props.centerLong
                        }
                    }
                    bounds={bounds}
                    onClick={this.onMapClicked}
                >
                    {this.props.locationsArray.length > 0 ?
                        (
                            <Marker
                                name={'Center Point'}
                                position={{ lat: this.props.centerLat, lng: this.props.centerLong }}
                                onClick={this.onMarkerClick}
                            />
                        ) :
                        (
                            <Fragment></Fragment>
                        )
                    }
                    {this.props.locationsArray.map(location =>
                        (
                            <Marker
                                position={{ lat: location[0], lng: location[1] }}
                                key={location}
                                icon=
                                {
                                    {
                                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                                    }
                                }
                            >
                            </Marker>
                        ))}
                    {this.props.placesArray.map(place =>
                        (
                            <Marker
                                name={place.name}
                                position={{ lat: place.coordinates.latitude, lng: place.coordinates.longitude }}
                                key={place.alias}
                                onClick={this.onMarkerClick}
                                icon=
                                {
                                    {
                                        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                    }
                                }
                            />
                        ))}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <p>{this.state.selectedPlace.name}</p>
                        </div>
                    </InfoWindow>
                </Map>
            </Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4"
})(MapContainer)