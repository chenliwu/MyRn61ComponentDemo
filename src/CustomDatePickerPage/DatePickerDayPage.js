/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

import CustomDatePickerUtils from './CustomDatePickerUtils';


export default class DatePickerDayPage extends React.Component {


    constructor(props) {
        super(props);
        const weekIndicatorList = [
            '日', '一', '二', '三', '四', '五', '六',
        ];
        let currentDateObj = moment();
        // 	星期中的第几天，数字表示: 0到6，0表示周日，6表示周六
        let currentWeekNumber = parseInt(currentDateObj.format('d'));
        // console.log('星期中的第几天', currentWeekNumber);
        this.state = {
            currentWeekNumber: currentWeekNumber,
            weekIndicatorList: weekIndicatorList,
        };
    }

    componentWillMount = () => {
        this.initCalendarData();
        this.initCalendarData1();
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


    renderWeekIndicatorComponent = () => {
        const {weekIndicatorList, currentWeekNumber} = this.state;
        return (
            <View style={{
                // flex: 1,
                height: 30,
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

        return (
            <SafeAreaView style={{
                flex: 1,
            }}>
                {
                    this.renderWeekIndicatorComponent()
                }
            </SafeAreaView>
        );
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
});
