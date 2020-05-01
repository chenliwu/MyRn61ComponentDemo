/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {
    Dimensions,
    FlatList,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
    TextInput,
} from 'react-native';

import pinyin from 'pinyin';


export default class DatePickerWeekPage extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {

    };


    render = () => {

        return (
            <SafeAreaView style={{
                flex: 1,
            }}>
                <Text>DatePickerWeekPage</Text>
            </SafeAreaView>
        );
    };


}

const styles = StyleSheet.create({
    taskNodeTitleText: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inactiveIndicatorContainer: {},
    activeIndicatorContainer: {
        backgroundColor: '#2988FF',
    },
    inactiveIndicatorText: {
        color: '#666666',
    },
    activeIndicatorText: {
        color: '#fff',
    },
});
