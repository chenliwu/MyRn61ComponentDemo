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
import moment from 'moment';

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
            renderCount: 0,
        };
    }

    componentWillMount = () => {

    };

    /**
     * 确定选择日期，获取日期数据
     */
    onConfirmPickDate = () => {
        const {tabActiveIndex, datePickDataList} = this.state;
        const datePickDate = datePickDataList[tabActiveIndex];
        console.log('onConfirmPickDate.datePickDate', datePickDate);
        if (!datePickDate.startDate) {
            alert('请选择开始日期');
            return;
        }
        if (!datePickDate.endDate) {
            alert('请选择结束日期');
            return;
        }
        let startTimeStamp, endTimeStamp;
        switch (tabActiveIndex) {
            case 0:

                break;
            case 1:

                break;
            case 2:
                // 获取当前月第一天0时0分0秒 startOf('month')
                startTimeStamp = datePickDate.startDate.startOf('month').format('x');
                // 获取当前月最后一天23时59分59秒 endOf('month')
                endTimeStamp = datePickDate.endDate.endOf('month').format('x');
                break;
            case 3:
                let startDateYear = datePickDate.startDate.year();
                let endDateYear = datePickDate.endDate.year();
                startTimeStamp = moment(startDateYear + '-01-01 00:00:00').format('x');
                endTimeStamp = moment(endDateYear + '-12-31 23:59:59').format('x');
                break;

        }
        console.log('startTimeStamp', startTimeStamp);
        console.log('endTimeStamp', endTimeStamp);
    };

    /**
     *
     * @param type
     * @param data
     */
    onUpdatePickDate = (type, data) => {
        console.log('onUpdatePickDate.type', type);
        console.log('onUpdatePickDate.data', data);
        const {tabActiveIndex, datePickDataList, renderCount} = this.state;
        if (data) {
            datePickDataList[tabActiveIndex] = data;
            this.setState({
                datePickDataList: datePickDataList,
                renderCount: renderCount + 1,
            });
        }
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
                        this.onConfirmPickDate();
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
                    initialPage={1}
                    onChangeTab={(data) => {
                        console.log('onChangeTab', data);
                        console.log('onChangeTab.toIndex', data.i);
                        this.handleTabChange(data.i);
                    }}
                    renderTabBar={() => <DefaultTabBar/>}
                >
                    <DatePickerDayPage
                        tabLabel='按日'
                        onUpdatePickDate={this.onUpdatePickDate}
                    />
                    <DatePickerWeekPage
                        tabLabel='按周'
                        onUpdatePickDate={this.onUpdatePickDate}
                    />
                    <DatePickerMonthPage
                        tabLabel='按月'
                        onUpdatePickDate={this.onUpdatePickDate}
                    />
                    <DatePickerYearPage
                        tabLabel='按年'
                        onUpdatePickDate={this.onUpdatePickDate}
                    />
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
                        }}>
                            起始日期
                        </Text>
                        <TouchableOpacity
                            style={[styles.selectBtnCommon, this.getPickDateTextContainerStyle('startDate')]}>
                            <Text style={this.getPickDateTextStyle('startDate')}>
                                {
                                    this.getPickDateInfo('startDate')
                                }
                            </Text>
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
                        }}>
                            结束日期
                        </Text>
                        <TouchableOpacity
                            style={[styles.selectBtnCommon, this.getPickDateTextContainerStyle('endDate')]}>
                            <Text style={this.getPickDateTextStyle('endDate')}>
                                {
                                    this.getPickDateInfo('endDate')
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    };

    /**
     * 日期显示文字的样式
     * @param type
     * @returns {{color: string}}
     */
    getPickDateTextContainerStyle = (type) => {
        const {tabActiveIndex, datePickDataList} = this.state;
        const datePickDate = datePickDataList[tabActiveIndex];
        let pickDate = datePickDate[type];
        if (datePickDate && pickDate) {
            return styles.activeSelectBtn;
        }
        return styles.inactiveSelectBtn;
    };

    /**
     * 日期显示文字的样式
     * @param type
     * @returns {{color: string}}
     */
    getPickDateTextStyle = (type) => {
        const {tabActiveIndex, datePickDataList} = this.state;
        const datePickDate = datePickDataList[tabActiveIndex];
        let pickDate = datePickDate[type];
        if (datePickDate && pickDate) {
            return {
                color: '#2988FF',
            };
        }
        return {
            color: '#D4D4D4',
        };
    };

    /**
     * 日期显示文字
     * @param type startDate|endDate
     * @returns {string}
     */
    getPickDateInfo = (type) => {
        const {tabActiveIndex, datePickDataList} = this.state;
        const datePickDate = datePickDataList[tabActiveIndex];
        let pickDate = datePickDate[type];
        if (datePickDate && pickDate) {
            let result = '请选择';
            switch (tabActiveIndex) {
                case 0:

                    break;
                case 1:

                    break;
                case 2:
                    result = pickDate.format('YYYY年MM月');
                    break;
                case 3:
                    result = pickDate.format('YYYY年');
                    break;

            }
            return result;
        } else {
            return '请选择';
        }
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

    selectBtnCommon: {
        flex: 1,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeSelectBtn: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#2988FF',
    },
    inactiveSelectBtn: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#D4D4D4',
    },


});
