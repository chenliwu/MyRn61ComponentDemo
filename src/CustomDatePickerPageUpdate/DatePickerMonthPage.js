/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import 'moment/locale/zh-cn';
import CustomDatePickerUtils from './CustomDatePickerUtils';

moment.locale('zh-cn');

const ITEM_HEIGHT = 50;      // item的高度
const HEADER_HEIGHT = 30;    // 分组头的高度


export default class DatePickerMonthPage extends React.Component {

    constructor(props) {
        super(props);
        let currentDateObj = moment();
        let currentMonth = currentDateObj.month();
        let currentYear = currentDateObj.year();
        this.state = {
            yearDataList: [],
            yearDataSessionList: [],

            minYear: 2000,
            maxYear: currentYear,

            currentMonth: currentMonth,
            currentYear: currentYear,
            datePickData: {
                startDate: null,
                endDate: null,
            },

            activeSectionIndex: 0,
        };
    }

    initDateList = () => {
        const {minYear, maxYear} = this.state;
        const yearDataSessionList = [];
        const yearDataList = CustomDatePickerUtils.getPickYearDataListRange(minYear, maxYear);
        const that = this;
        yearDataList.forEach((item, index, arr) => {
            yearDataSessionList.push({
                title: item.year(),
                data: that.getMonthList(item.year()),
            });
        });
        this.setState({
            yearDataSessionList: yearDataSessionList,
            yearDataList: yearDataList,
        }, () => {

        });
    };

    getMonthList = (year) => {
        const monthDataList = [];
        const {currentYear, currentMonth, maxYear} = this.state;
        let monthCount = 11;
        if (currentYear === year && maxYear === currentYear) {
            monthCount = currentMonth;
        }
        for (let i = monthCount; i >= 0; i--) {
            let dateObj = moment().year(year);
            dateObj.month(i);
            // monthDataList.push(dateObj);
            monthDataList.push({
                date: dateObj,
                dateStamp: dateObj.format('x'),
                monthText: this.getMonthText(dateObj),
            });
        }
        return monthDataList;
    };

    getMonthText = (date) => {
        let result = date.format('MM月');
        if (moment().format('YYYYMMM') === date.format('YYYYMMM')) {
            result = result + '  本月';
        }
        return result;
    };

    componentWillMount = () => {
        console.log('DatePickerMonthPage.componentWillMount');
    };

    componentDidMount(): void {
        console.log('DatePickerMonthPage.componentDidMount');
        this.initDateList();
    }


    render = () => {
        const {yearDataList, activeSectionIndex} = this.state;
        return (
            <SafeAreaView style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <View style={{
                    width: 80,
                    backgroundColor: '#F0F7FF',
                }}>
                    <FlatList
                        data={yearDataList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                            let containerStyle = activeSectionIndex === index
                                ? styles.activeYearItemContainer
                                : styles.inactiveYearItemContainer;
                            let textStyle = activeSectionIndex === index
                                ? styles.activeYearItemText
                                : styles.inactiveYearItemText;
                            return (
                                <TouchableOpacity
                                    style={[
                                        {
                                            flex: 1,
                                            paddingBottom: 10,
                                            paddingTop: 10,
                                            // backgroundColor: 'pink',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        },
                                        containerStyle,
                                    ]}
                                    onPress={() => {
                                        this.setState({
                                            activeSectionIndex: index,
                                        });
                                    }}
                                >
                                    <Text style={[{
                                        fontSize: 16,
                                    }, textStyle]}>
                                        {item.year()}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
                {
                    this.renderDateData()
                }

            </SafeAreaView>
        );
    };

    renderDateData = () => {
        const {activeSectionIndex, yearDataSessionList} = this.state;
        const data = yearDataSessionList[activeSectionIndex];
        console.log('data', data);
        console.log('yearDataSessionList', yearDataSessionList);
        console.log('show data', yearDataSessionList[activeSectionIndex]);
        if (data) {
            const showDataList = data.data;
            return (
                <ScrollView style={{
                    flex: 1,
                }}>
                    <View style={{
                        height: HEADER_HEIGHT,
                        backgroundColor: '#F5F6F6',
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{fontSize: 16}}>
                            {data.title}年
                        </Text>
                    </View>
                    {
                        showDataList.map((item, index, arr) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.itemRowContainerCommon, this.getItemRowContainerStyle(item, index)]}
                                    activeOpacity={.75}
                                    onPress={() => {
                                        this.onItemClick(item);
                                    }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flexGrow: 1,
                                    }}>
                                        <View style={{}}>
                                            <Text style={[{
                                                fontSize: 14,
                                            }, this.getItemRowTextStyle(item)]}>
                                                {
                                                    item.monthText
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>

            );
        }
    };

    onItemClick = (item) => {
        const {datePickData} = this.state;
        const {onUpdatePickDate} = this.props;
        if (datePickData.startDate) {
            if (datePickData.endDate) {
                datePickData.startDate = item;
                datePickData.endDate = null;
            } else {
                let startDateStamp = datePickData.startDate.dateStamp;
                let itemDateStamp = item.dateStamp;
                if (itemDateStamp < startDateStamp) {
                    datePickData.startDate = item;
                } else if (itemDateStamp === startDateStamp) {
                    datePickData.endDate = item;
                } else {
                    datePickData.endDate = item;
                }
            }
        } else {
            // 选择开始日期
            datePickData.startDate = item;
        }
        this.setState({
            datePickData: datePickData,
        }, () => {
            onUpdatePickDate && onUpdatePickDate(2, datePickData);
        });
    };

    /**
     * 行容器样式
     * @param item
     * @returns {{backgroundColor: string}|{backgroundColor: string}}
     */
    getItemRowContainerStyle = (item) => {
        const {datePickData} = this.state;
        if (datePickData.startDate && datePickData.endDate) {
            let startDateStamp = datePickData.startDate.dateStamp;
            let endDateStamp = datePickData.endDate.dateStamp;
            let itemDateStamp = item.dateStamp;
            if (itemDateStamp >= startDateStamp && itemDateStamp <= endDateStamp) {
                return styles.activeItemRowContainer;
            }
        }
        if (item === datePickData.startDate
            || item === datePickData.endDate) {
            return styles.activeItemRowContainer;
        }
        return styles.inactiveItemRowContainer;
    };

    /**
     * 选中文字颜色
     * @param item
     * @returns {{color: string}|{color: string}}
     */
    getItemRowTextStyle = (item) => {
        const {datePickData} = this.state;
        if (item === datePickData.startDate
            || item === datePickData.endDate) {
            return styles.activeItemRowText;
        }
        return styles.inactiveItemRowText;
    };

    _keyExtractor = (item, index) => {
        return index.toString();
    };


}

const styles = StyleSheet.create({
    itemRowContainerCommon: {
        paddingLeft: 20,
        paddingRight: 30,
        height: ITEM_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
    },
    activeItemRowContainer: {
        backgroundColor: '#F2F8FF',
    },
    inactiveItemRowContainer: {
        backgroundColor: '#FFFFFF',
    },

    activeYearItemContainer: {
        backgroundColor: '#378EFF',
    },
    inactiveYearItemContainer: {
        backgroundColor: '#F2F8FF',
    },
    activeYearItemText: {
        color: '#FFFFFF',
    },
    inactiveYearItemText: {},

    activeItemRowText: {
        color: '#2988ff',
    },
    inactiveItemRowText: {
        color: '#666666',
    },
});
