/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions} from 'react-native';
import moment from 'moment';

import CustomDatePickerUtils from './CustomDatePickerUtils';

const SCREEN_WIDTH = Dimensions.get('window').width;
const weekIndicatorList = [
    '日', '一', '二', '三', '四', '五', '六',
];

export default class DatePickerDayPage extends React.Component {


    constructor(props) {
        super(props);
        let currentDateObj = moment();
        // 	星期中的第几天，数字表示: 0到6，0表示周日，6表示周六
        let currentWeekNumber = parseInt(currentDateObj.format('d'));
        // 默认显示最近两个月的日历
        let startDate = moment().subtract(1, 'month');
        let endDate = moment();

        let startMonthDaysCalendarArray = this.getMonthDaysCalendarArray(startDate);
        let endMonthDaysCalendarArray = this.getMonthDaysCalendarArray(endDate);

        this.state = {
            currentDateNumber: parseInt(currentDateObj.format('YYYYMMDD')),
            currentWeekNumber: currentWeekNumber,
            weekIndicatorList: weekIndicatorList,

            startMonthDaysCalendarDate: startDate,
            startMonthDaysCalendarArray: startMonthDaysCalendarArray,
            endMonthDaysCalendarDate: endDate,
            endMonthDaysCalendarArray: endMonthDaysCalendarArray,
            datePickData: {
                startDate: null,
                startDateNumber: null,
                endDate: null,
                endDateNumber: null,
            },
        };
    }

    componentWillMount = () => {
        // this.initCalendarData();
        // this.initCalendarData1();
    };

    initCalendarData = () => {
        // 当前Date日期
        const date = new Date();
        // 获取年份
        const fullYear = date.getFullYear();
        // 获取月份，返回值是0(一月)到11(十二月)之间的一个整数。
        const month = date.getMonth();
        // 获取当前月第一天Date
        const first_date = new Date(fullYear, month, 1);
        // 获取当前月第一天是星期几: 返回date对象星期中的一天，此值为0(周日)-6(周六)之间的一个整数
        const week = first_date.getDay();
        const days_of_month = new Array(31, 28 + CustomDatePickerUtils.isLeap(fullYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //各月份的总天数
        const rows = Math.ceil((days_of_month[month] + week) / 7); //表格所需要行数

        const monthDaysCalendarArray = [];
        // 打印表格第一行（有星期标志）
        for (let i = 0; i < rows; i++) { // 表格的行
            monthDaysCalendarArray.push([]);
            for (let k = 0; k < 7; k++) { // 表格每行的单元格
                let idx = i * 7 + k; // 单元格自然序列号
                let date_str = idx - week + 1; // 计算日期
                // 过滤无效日期（小于等于零的、大于月总天数的）
                // (date_str <= 0 || date_str > days_of_month[month]) ? date_str = '&nbsp;' : date_str = idx - week + 1;
                if (date_str <= 0 || date_str > days_of_month[month]) {
                    monthDaysCalendarArray[i].push('X');
                } else {
                    monthDaysCalendarArray[i].push(idx - week + 1);
                }
            }
        }
        console.log('initCalendarData.monthDaysCalendarArray', monthDaysCalendarArray);
    };

    initCalendarData1 = () => {
        // 当前Date日期
        const date = new Date();
        // 获取年份
        const year = date.getFullYear();
        // 获取月份，返回值是0(一月)到11(十二月)之间的一个整数。
        const month = date.getMonth();
        // 获取当月日历数组
        const monthDaysCalendarArray = CustomDatePickerUtils.getMonthDaysCalendarArray(year, month);
        console.log('initCalendarData1.monthDaysCalendarArray', monthDaysCalendarArray);
    };

    getMonthDaysCalendarArray = (momentObj) => {
        let year = momentObj.year();
        let month = momentObj.month();
        // 获取当前月第一天Date
        const first_date = new Date(year, month, 1);
        // 获取当前月第一天是星期几: 返回date对象星期中的一天，此值为0(周日)-6(周六)之间的一个整数
        const week = first_date.getDay();
        // 获取当月的总天数
        const daysOfMonth = CustomDatePickerUtils.getDaysOfMonth(year, month);
        // 计算表格所需要行数
        const rows = Math.ceil((daysOfMonth + week) / 7);
        const monthDaysCalendarArray = [];
        // 表格第一行（有星期标志）
        for (let i = 0; i < rows; i++) { // 表格的行
            monthDaysCalendarArray.push([]);
            for (let k = 0; k < 7; k++) { // 表格每行的单元格
                // 单元格自然序列号
                let idx = i * 7 + k;
                // 计算日期
                let dayNumber = idx - week + 1;
                // 过滤无效日期（小于等于零的、大于月总天数的）
                if (dayNumber <= 0 || dayNumber > daysOfMonth) {
                    // 无效日期
                    monthDaysCalendarArray[i].push(null);
                } else {
                    let dateNumber;
                    if (dayNumber < 10) {
                        dateNumber = parseInt(`${momentObj.format('YYYYMM')}0${dayNumber}`);
                    } else {
                        dateNumber = parseInt(`${momentObj.format('YYYYMM')}${dayNumber}`);
                    }
                    monthDaysCalendarArray[i].push({
                        dayNumber: dayNumber,
                        dateNumber: dateNumber,
                    });
                }
            }
        }
        return monthDaysCalendarArray;
    };


    renderWeekIndicatorComponent = () => {
        const {weekIndicatorList, currentWeekNumber} = this.state;
        return (
            <View style={{
                // flex: 1,
                height: 40,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                {
                    weekIndicatorList.map((item, index, arr) => {
                        let weekIndicatorTextStyle = styles.inactiveWeekIndicatorText;
                        if (index === currentWeekNumber) {
                            weekIndicatorTextStyle = styles.activeWeekIndicatorText;
                        }
                        return (
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={[styles.weekIndicatorTextCommon, weekIndicatorTextStyle]}>
                                    {
                                        item
                                    }
                                </Text>
                            </View>
                        );
                    })
                }

            </View>
        );
    };
    render = () => {
        const {
            startMonthDaysCalendarDate, startMonthDaysCalendarArray,
            endMonthDaysCalendarDate, endMonthDaysCalendarArray,
        } = this.state;
        return (
            <SafeAreaView style={{
                flex: 1,
            }}>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                    paddingRight: 5,
                }}>

                    {
                        this.renderWeekIndicatorComponent()
                    }
                    <ScrollView style={{
                        flex: 1,
                    }}>
                        {
                            this.renderMonthDaysCalendarArray(startMonthDaysCalendarDate, startMonthDaysCalendarArray)
                        }
                        {
                            this.renderMonthDaysCalendarArray(endMonthDaysCalendarDate, endMonthDaysCalendarArray)
                        }
                    </ScrollView>

                </View>


            </SafeAreaView>
        );
    };

    renderMonthDaysCalendarArray = (monthDaysCalendarDate, monthDaysCalendarArray) => {
        const {datePickData} = this.state;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                // backgroundColor:'gray'
            }}>
                <View style={{
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            marginLeft: 15,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                        onPress={() => {

                        }}
                    >
                        <Text style={{
                            fontSize: 18,
                            color: '#666666',
                        }}>
                            {
                                '<'
                            }
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: '#666666',
                        }}>
                            {
                                monthDaysCalendarDate.format('YYYY年MM月')
                            }
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            marginRight: 15,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}
                        onPress={() => {

                        }}
                    >
                        <Text style={{
                            fontSize: 18,
                            color: '#666666',
                        }}>
                            {
                                '>'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {
                        monthDaysCalendarArray.map((itemList, index1, arr1) => {
                            return (
                                <View style={{
                                    height: 40,
                                    marginBottom: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                    {
                                        itemList.map((item, index2, arr2) => {
                                            return this.renderMonthDaysCalendarItem(item, index2, monthDaysCalendarDate, datePickData);
                                        })
                                    }
                                </View>
                            );
                        })
                    }
                </View>


            </View>
        );
    };

    /**
     *
     * @param item  {dayNumber:08,dateNumber:'20200508'}
     * @param index
     * @param monthDaysCalendarDate
     * @param datePickData
     * @returns {*}
     */
    renderMonthDaysCalendarItem = (item, index, monthDaysCalendarDate, datePickData) => {
        if (item) {
            let itemDateNumber = item.dateNumber;
            if (datePickData.startDate) {
                let startDateNumber = parseInt(`${datePickData.startDate.format('YYYYMMDD')}`);
                if (startDateNumber === itemDateNumber) {
                    return this.renderSelectedItem(item, index, monthDaysCalendarDate, 'startDate');
                }
            }
            if (datePickData.endDate) {
                let endDateNumber = parseInt(`${datePickData.endDate.format('YYYYMMDD')}`);
                if (endDateNumber === itemDateNumber) {
                    return this.renderSelectedItem(item, index, monthDaysCalendarDate, 'endDate');
                }
            }
            return this.renderNotSelectedItem(item, index, monthDaysCalendarDate);
        }
        return (
            <View style={{flex: 1}}>
            </View>
        );
    };

    /**
     * 绘制"选中状态的日期"
     * @param item
     * @param index
     * @param monthDaysCalendarDate
     * @param selectedType  startDate|endDate
     * @returns {*}
     */
    renderSelectedItem = (item, index, monthDaysCalendarDate, selectedType) => {
        return (
            <TouchableOpacity
                style={[
                    {
                        flex: 1,
                        borderRadius: 40,
                        backgroundColor: '#378EFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
                onPress={() => {
                    let pinkedDate = monthDaysCalendarDate.clone();
                    pinkedDate.date(item.dayNumber);
                    this.onItemClick(pinkedDate, item.dateNumber);
                }}
            >
                <Text style={{
                    fontSize: 16,
                    color: '#ffffff',
                }}>
                    {
                        item.dayNumber
                    }
                </Text>
                <Text style={{
                    fontSize: 8,
                    color: '#ffffff',
                }}>
                    {
                        selectedType === 'startDate'
                            ? '开始'
                            : '结束'
                    }
                </Text>
            </TouchableOpacity>
        );
    };

    renderNotSelectedItem = (item, index, monthDaysCalendarDate) => {
        return (
            <TouchableOpacity
                style={[
                    {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
                onPress={() => {
                    let pinkedDate = monthDaysCalendarDate.clone();
                    pinkedDate.date(item.dayNumber);
                    this.onItemClick(pinkedDate, item.dateNumber);
                }}
            >
                <Text style={{
                    fontSize: 16,
                    color: '#2E2E39',
                }}>
                    {
                        item.dayNumber
                    }
                </Text>
            </TouchableOpacity>
        );
    };

    onItemClick = (itemDate, itemDateNumber) => {
        const {datePickData} = this.state;
        const {onUpdatePickDate} = this.props;

        if (datePickData.startDate) {
            if (datePickData.endDate) {
                datePickData.startDate = itemDate;
                datePickData.endDate = null;
            } else {
                let startDateNumber = parseInt(`${datePickData.startDate.format('YYYYMMDD')}`);
                if (itemDateNumber < startDateNumber) {
                    datePickData.startDate = itemDate;
                } else if (itemDateNumber === startDateNumber) {
                    datePickData.endDate = itemDate;
                } else {
                    datePickData.endDate = itemDate;
                }
            }
        } else {
            // 选择开始日期
            datePickData.startDate = itemDate;
        }
        this.setState({
            datePickData: datePickData,
        }, () => {
            onUpdatePickDate && onUpdatePickDate(1, datePickData);
        });
    };


}

const styles = StyleSheet.create({
    weekIndicatorTextCommon: {
        fontSize: 12,
    },
    inactiveWeekIndicatorText: {
        color: '#CBC9D5',
    },
    activeWeekIndicatorText: {
        color: '#378EFF',
    },

    activeDayItemContainer: {
        borderRadius: 30,
        backgroundColor: '#378EFF',
    },
    inactiveDayItemContainer: {
        backgroundColor: '#FFFFFF',
    },

});
