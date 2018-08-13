/**
 * @providesModule constants
 */

import {Dimensions, Platform} from 'react-native';

export const {width, height} = Dimensions.get('window');


export const style = {
    px1: width * 1 / 360,
    width,
    height,
    black: '#000',
};