/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';

import {style} from './src/constants';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const blockSize = style.px1 * 24;
export default class App extends Component<Props> {
    constructor() {
        super();
        this.state = {
            finalX: style.px1*180,
            finalY: style.px1*200,
            x: style.px1*180,
            y: style.px1*200,
            time: 0,
        };
        this.x = style.px1*180;
        this.y = style.px1*200;
        this.velX = style.px1*3;
        this.velY = style.px1*16;
        this.accY = style.px1*0.8;
        this.leftInterval = null;
        this.rightInterval = null;
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <View style={styles.container}>
                    <View style={{width: style.width, height: style.height, flexDirection: 'row', zIndex: 10000}}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                if(this.leftInterval) {
                                    clearInterval(this.leftInterval);
                                }
                                if(this.rightInterval) {
                                    clearInterval(this.rightInterval);
                                }
                                this.setState((prevState) => {
                                    return {
                                        finalX: prevState.x,
                                        finalY: prevState.y,
                                        time: 0,
                                    }
                                });
                                this.leftInterval = setInterval(() => {
                                    this.setState((prevState) => {
                                        return {
                                            x: prevState.finalX - this.velX * this.state.time,
                                            y: prevState.finalY + this.velY*this.state.time - 1/2*this.accY*this.state.time*this.state.time,
                                            time: prevState.time + 1,
                                        }
                                    });
                                }, 2);
                            }}
                        >
                            <View style={{flex:1,}} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                if(this.leftInterval) {
                                    clearInterval(this.leftInterval);
                                }
                                if(this.rightInterval) {
                                    clearInterval(this.rightInterval);
                                }
                                this.setState((prevState) => {
                                    return {
                                        finalX: prevState.x,
                                        finalY: prevState.y,
                                        time: 0,
                                    }
                                });
                                this.rightInterval = setInterval(() => {
                                    this.setState((prevState) => {
                                        return {
                                            x: prevState.finalX + this.velX * this.state.time,
                                            y: prevState.finalY + this.velY*this.state.time - 1/2*this.accY*this.state.time*this.state.time,
                                            time: prevState.time + 1,
                                        }
                                    });
                                }, 2);
                            }}
                        >
                            <View style={{flex:1}} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{...styles.brick, left: this.state.x - (blockSize * (Math.sqrt(2) - 1)), bottom: this.state.y - (blockSize * (Math.sqrt(2) - 1))}} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        alignItems: 'center',
    },
    brick: {
        width: blockSize,
        height: blockSize,
        position: 'absolute',
        backgroundColor: style.black,
        transform: [{
            rotate: '45deg',
        }]
    }
});
