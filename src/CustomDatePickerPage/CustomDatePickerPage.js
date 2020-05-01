/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import DatePickerDayPage from './DatePickerDayPage';
import DatePickerWeekPage from './DatePickerWeekPage';
import DatePickerMonthPage from './DatePickerMonthPage';
import DatePickerYearPage from './DatePickerYearPage';

export default class CustomDatePickerPage extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {

    };

    renderHeaderComponent = () => {
        return (
            <View style={{
                // height: 50,
                paddingTop: 10,
                paddingBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                //backgroundColor: 'pink',
            }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        // backgroundColor: 'red',
                    }}
                    onPress={() => {

                    }}
                >
                    <Text>
                        取消
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1,
                        // backgroundColor: 'blue',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>
                        选择日期
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginRight: 10,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        // backgroundColor: 'green',
                    }}
                    onPress={() => {

                    }}
                >
                    <Text style={{
                        color: '#2988FF',
                    }}>
                        确定
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };


    render = () => {

        return (
            <SafeAreaView style={{
                flex: 1,
            }}>
                {
                    this.renderHeaderComponent()
                }
                <ScrollableTabView
                    style={{marginTop: 20}}
                    initialPage={1}
                    renderTabBar={() => <DefaultTabBar/>}
                >
                    <DatePickerDayPage tabLabel='按日'/>
                    <DatePickerWeekPage tabLabel='按周'/>
                    <DatePickerMonthPage tabLabel='按月'/>
                    <DatePickerYearPage tabLabel='按年'/>

                </ScrollableTabView>
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
