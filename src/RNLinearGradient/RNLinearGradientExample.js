/**
 *
 * @author chenlw
 * @date 2020/04/18
 */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class RNLinearGradientExample extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            totalDuration: 0,
            status: 0,
        };
    }

    componentWillMount = () => {

    };

    render = () => {
        return (
            <View style={{
                flex: 1,

            }}>
                <LinearGradient colors={['#5681FF','#A1E2E2']} style={{flex: 1}}>
                    <View style={{
                        flex: 1,
                        height: 500,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text>用户登录</Text>
                    </View>
                </LinearGradient>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    taskNodeTitleText: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
