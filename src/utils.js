import {Platform, PixelRatio} from 'react-native';
export const API_KEY = 'aAIzDaaSyAOcaaHha1dEPl3knhrendatsomdateusxxMd7DmGqlaeYqdYjxVlUY';
export function getPixelSize(pixels){
    return Platform.select({
        ios: pixels,
        android: PixelRatio.getPixelSizeForLayoutSize(pixels)
    })
}
