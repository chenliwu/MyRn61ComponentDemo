/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {FlatList, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const ITEM_HEIGHT = 50;     // item的高度
const HEADER_HEIGHT = 30;   // 分组头的高度
const SEPARATOR_HEIGHT = 0;  //分割线的高度

import CustomDatePickerUtils from './CustomDatePickerUtils';


export default class DatePickerMonthPage extends React.Component {

    offsetDataList = [];

    constructor(props) {
        super(props);
        let currentDateObj = moment();
        let currentMonth = currentDateObj.month();
        let currentYear = currentDateObj.year();
        this.state = {
            yearDataList: [],
            yearDataSessionList: [],
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
        const yearDataSessionList = [];
        const yearDataList = CustomDatePickerUtils.getPickYearDataList();
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
            this.initOffsetDataList();
        });
    };

    getMonthList = (year) => {
        const monthDataList = [];
        const {currentYear, currentMonth} = this.state;
        let monthCount = 11;
        if (currentYear === year) {
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

    /**
     * 初始化 滚动偏移量数组
     */
    initOffsetDataList = () => {
        const {yearDataSessionList} = this.state;
        const offsetDataList = [];
        let offsetYSum = 0;
        yearDataSessionList.forEach((item, index, arr) => {
            let offsetDataItem = {};
            if (index === 0) {
                offsetDataItem.title = item.title;
                offsetDataItem.index = index;
                offsetDataItem.offsetY = 0;
                offsetDataList.push(offsetDataItem);
            } else {
                offsetYSum += arr[index - 1].data.length * ITEM_HEIGHT;
                offsetDataItem.title = item.title;
                offsetDataItem.index = index;
                offsetDataItem.offsetY = offsetYSum;
                offsetDataList.push(offsetDataItem);
            }

        });
        this.offsetDataList = offsetDataList;
    };


    componentWillMount = () => {
        console.log('DatePickerMonthPage.componentWillMount');
    };

    componentDidMount(): void {
        console.log('DatePickerMonthPage.componentDidMount');
        this.initDateList();
    }


    render = () => {
        const {yearDataList, yearDataSessionList,activeSectionIndex} = this.state;
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
                                        containerStyle
                                    ]}
                                    onPress={() => {
                                        this.refs._sectionList.scrollToLocation({
                                            itemIndex: 0,
                                            sectionIndex: index,
                                            viewOffset: 1,
                                        });
                                        this.setState({
                                            activeSectionIndex: index,
                                        });
                                    }}
                                >
                                    <Text style={[{
                                        fontSize: 16,
                                    },textStyle]}>
                                        {item.year()}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <SectionList
                        ref="_sectionList"
                        renderItem={({item, index, section}) => this._renderItem(item, index, section)}
                        renderSectionHeader={this._renderSectionHeader.bind(this)}
                        getItemLayout={this._getItemLayout}
                        onScrollBeginDrag={this._onScrollBeginDrag}
                        onScrollEndDrag={this._onScrollEndDrag}
                        sections={yearDataSessionList}
                        keyExtractor={(item, index) => item + index}
                        ItemSeparatorComponent={() => <View/>}
                    />

                </View>

            </SafeAreaView>
        );
    };

    /**
     * 滑动开始回调事件
     *
     * 注意：当刚刚开始滑动时，event.nativeEvent.contentOffset.y仍然是上次滑动的值，没有变化
     *
     * @param event
     * @private
     */
    _onScrollBeginDrag = (event) => {
        // event.nativeEvent.contentOffset.y表示Y轴滚动的偏移量
        const offsetY = event.nativeEvent.contentOffset.y;
        let index = this.getSectionIndexByOffsetY(offsetY);
        // console.log('offsetY', offsetY);
        //console.log('_onScrollBeginDrag.getSectionIndexByOffsetY', index);
        const {activeSectionIndex} = this.state;
        if (activeSectionIndex !== index) {
            this.setState({
                activeSectionIndex: index,
            });
        }
    };

    /**
     * 根据Y轴滑动偏移量，来计算出当前年份在指示器数组的index
     * @param offsetY
     * @returns {number|*}
     */
    getSectionIndexByOffsetY = (offsetY) => {
        let i, len;
        for (i = 1, len = this.offsetDataList.length; i <= len - 1; i++) {
            let item1 = this.offsetDataList[i - 1];
            let item2 = this.offsetDataList[i];
            if (offsetY <= item1.offsetY) {
                return item1.index;
            } else if (offsetY > item1.offsetY && offsetY <= item2.offsetY) {
                return item1.index;
            }
        }
        if (i === len && this.offsetDataList[i - 1].offsetY < offsetY) {
            return this.offsetDataList[i - 1].index;
        }
        return -1;
    };


    /**
     * 滑动停止回调事件
     * @param event
     * @private
     */
    _onScrollEndDrag = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        let index = this.getSectionIndexByOffsetY(offsetY);
        // console.log('offsetY', offsetY);
        // console.log('_onScrollEndDrag.getSectionIndexByOffsetY', index);
        const {activeSectionIndex} = this.state;
        if (activeSectionIndex !== index) {
            this.setState({
                activeSectionIndex: index,
            });
        }
    };

    _renderSectionHeader(sectionItem) {
        const {section} = sectionItem;
        return (
            <View style={{
                height: HEADER_HEIGHT,
                backgroundColor: '#F5F6F6',
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Text style={{fontSize: 16}}>
                    {section.title}年
                </Text>
            </View>
        );
    }

    _getItemLayout(data, index) {
        let [length, separator, header] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER_HEIGHT];
        return {length, offset: (length + separator) * index + header, index};
    }

    _renderItem(item, index, section) {
        return (
            <TouchableOpacity
                style={[styles.itemRowContainerCommon, this.getItemRowContainerStyle(item, index)]}
                // style={[styles.itemRowContainerCommon]}
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
    }

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
