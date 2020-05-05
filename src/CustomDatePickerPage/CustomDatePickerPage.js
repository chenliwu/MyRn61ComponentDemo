/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import DatePickerDayPage from './DatePickerDayPage';
import DatePickerWeekPage from './DatePickerWeekPage';
import DatePickerMonthPage from './DatePickerMonthPage';
import DatePickerYearPage from './DatePickerYearPage';

export default class CustomDatePickerPage extends React.PureComponent {


    constructor(props) {
        super(props);
        // 用数组记录选择的日期，
        // 0，按日；1，按周；2，按月；3，按年。
        let datePickDataList = [];
        datePickDataList.push({
            startDate: null,
            endDate: null,
        });
        datePickDataList.push({
            startDate: null,
            endDate: null,
        });
        datePickDataList.push({
            startDate: null,
            endDate: null,
        });
        datePickDataList.push({
            startDate: null,
            endDate: null,
        });
        this.state = {
            datePickDataList: datePickDataList,
            tabActiveIndex: 3,
        };
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

    handleTabChange = (tabActiveIndex) => {
        this.setState({
            tabActiveIndex: tabActiveIndex,
        });
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
                    initialPage={3}
                    onChangeTab={(data) => {
                        console.log('onChangeTab', data);
                        console.log('onChangeTab.toIndex', data.i);
                        this.handleTabChange(data.i);
                    }}
                    renderTabBar={() => <DefaultTabBar/>}
                >
                    <DatePickerDayPage tabLabel='按日'/>
                    <DatePickerWeekPage tabLabel='按周'/>
                    <DatePickerMonthPage tabLabel='按月'/>
                    <DatePickerYearPage tabLabel='按年'/>

                </ScrollableTabView>
                {
                    this.renderBottomComponent()
                }
            </SafeAreaView>
        );
    };

    renderBottomComponent = () => {
        return (
            <View style={{
                height: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'pink',
            }}>

                <View style={[styles.selectBtnContainer]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        position: 'relative',
                    }}>
                        <Text style={{
                            position: 'absolute',
                            top: -25,
                            color: '#666666',
                        }}>起始日期</Text>
                        <TouchableOpacity
                            style={[styles.selectBtn]}>
                            <Text style={{
                                color: '#D4D4D4',
                            }}>请选择</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Image
                    style={{}}
                    width={50}
                    height={30}
                    source={require('@assets/icons/common/icon_right_date_indicator.png')}/>

                <View style={[styles.selectBtnContainer]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        position: 'relative',
                    }}>
                        <Text style={{
                            position: 'absolute',
                            top: -25,
                            color: '#666666',
                        }}>结束日期</Text>
                        <TouchableOpacity
                            style={[styles.selectBtn]}>
                            <Text style={{
                                color: '#D4D4D4',
                            }}>请选择</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    };

}

const styles = StyleSheet.create({

    selectBtnContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectBtn: {
        flex: 1,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#2988FF',
        justifyContent: 'center',
        alignItems: 'center',
    },


});
