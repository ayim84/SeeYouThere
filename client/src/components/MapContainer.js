import React, { Fragment, Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends Component {
    shouldComponentUpdate(nextProps, nextState)
        {
            if(this.props.placesArray === nextProps.placesArray)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    
    render() {
        console.log("props: ", this.props);
        // console.log("Locations Array: ", this.props.locationsArray[0]);

        const style =
        {
            width: '40%',
            height: '70%'
        }

        let bounds = new this.props.google.maps.LatLngBounds();

        for (let i = 0; i < this.props.locationsObjArray.length; i++) {
            bounds.extend(this.props.locationsObjArray[i]);
        }

        console.log("Bounds: " + bounds);

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
                >
                    {this.props.locationsArray.length > 0 ?
                        (
                            <Marker
                                name={'Center'}
                                position={{ lat: this.props.centerLat, lng: this.props.centerLong }}
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
                                position={{lat: place.coordinates.latitude, lng: place.coordinates.longitude}}
                                key={place.alias}
                                icon=
                                {
                                    {
                                        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                    }
                                }
                            />
                        ))}
                </Map>
            </Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4"
})(MapContainer)