import {Platform, PixelRatio} from 'react-native';
export const API_KEY = 'AIzaSyAOcHha1EPl3knhrenatomateusxxM7DmGqlaeYqYjxVlUY';
export function getPixelSize(pixels){
    return Platform.select({
        ios: pixels,
        android: PixelRatio.getPixelSizeForLayoutSize(pixels)
    })
}