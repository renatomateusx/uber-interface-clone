import React, { Component, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Image } from 'react-native';
import Search from '../Search';
import Directions from '../Directions';
import { getPixelSize, API_KEY } from '../../src/utils';
import imageMarker from '../../assets/marker.png';
import backImage from '../../assets/back.png';
import { Back, LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall } from './styles';
import Geocorder from 'react-native-geocoding';
import Details from '../Details';

Geocorder.init(API_KEY);
class Map extends Component {

    state = {
        region: null,
        destination: null,
        duration: null,
        street: null
    };
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocorder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const street = address.substring(0, address.indexOf(','));
                //sucesso
                this.setState({
                    street,
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                })
            }
            , () => {
                //erro
            },
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    };
    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            },
        })
    };
    handleBack = () => {
        this.setState({ destination: null });
    };

    handleStateDuration = (value) => {
        return new Promise((resolve, reject) => {
            try {
                this.setState({ duration: value });
                resolve(1);
            }
            catch (error) {
                reject(error);
            }
        })
    };

    render() {
        const { region, destination, duration, street } = this.state;
        return (
            <View style={{ flex: 1 }}>

                <MapView
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    ref={el => this.mapView = el}
                >
                    {destination && (
                        <Fragment>
                            <Directions
                                origin={region}
                                destination={destination}
                                onReady={async (result) => {
                                    const LE = await this.handleStateDuration(Math.floor(result.duration));
                                    this.mapView.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: getPixelSize(50),
                                            left: getPixelSize(50),
                                            top: getPixelSize(50),
                                            bottom: getPixelSize(120)
                                        }
                                    });


                                }}
                            />
                            <Marker
                                coordinate={destination}
                                anchor={{ x: 0, y: 0 }}
                                image={imageMarker} >
                                <LocationBox>
                                    <LocationText>{destination.title}</LocationText>
                                </LocationBox>
                            </Marker>

                            <Marker
                                coordinate={region}
                                anchor={{ x: 0, y: 0 }}
                            >
                                <LocationBox>
                                    <LocationTimeBox>
                                        <LocationTimeText>{duration}</LocationTimeText>
                                        <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                    </LocationTimeBox>
                                    <LocationText>{street}</LocationText>
                                </LocationBox>
                            </Marker>
                        </Fragment>
                    )}

                </MapView>
                {destination ? (
                    <>
                        <Back onPress={this.handleBack}>
                            <Image source={backImage} />
                        </Back>
                        <Details />
                    </>
                ) : (<Search onLocationSelected={this.handleLocationSelected} />)}

            </View>
        );
    };
}

export default Map;