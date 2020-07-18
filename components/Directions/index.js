import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { API_KEY } from '../../src/utils';

// AAAIzaSyAOcHha1EPl3knhxM7DmGqlaeYqYjxVlUY
const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey={API_KEY}
        strokeWidth={3}
        strokeColor="#222"
    />
);

export default Directions;