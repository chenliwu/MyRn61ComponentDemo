/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, Text, FlatList, SectionList} from 'react-native';
import moment from 'moment';

import CustomDatePickerUtils from './CustomDatePickerUtils';


export default class DatePickerMonthPage extends React.Component {


    constructor(props) {
        super(props);
        let currentDateObj = moment();
        let currentMonth = currentDateObj.month();
        let currentYear = currentDateObj.year();
        console.log('currentYear', currentYear);
        console.log('currentMonth', currentMonth);
        this.state = {
            yearDataList: [],
            yearDataSessionList: [],
            currentMonth: currentMonth,
            currentYear: currentYear,
            datePickData: {
                startDate: null,
                endDate: null,
            },
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
        // this.getMonthList(2020);
        // console.log('yearDataSessionList', yearDataSessionList);
        this.setState({
            yearDataSessionList: yearDataSessionList,
            yearDataList: yearDataList,
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
            monthDataList.push(dateObj);
        }
        // console.log('monthDataList', monthDataList);
        return monthDataList;
    };


    componentWillMount = () => {
        console.log('DatePickerMonthPage.componentWillMount');
    };

    componentDidMount(): void {
        console.log('DatePickerMonthPage.componentDidMount');
        this.initDateList();
    }


    render = () => {
        const {yearDataList, yearDataSessionList} = this.state;
        return (
            <SafeAreaView style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <View style={{
                    width: 100,
                    backgroundColor: '#F0F7FF',
                }}>
                    <FlatList
                        data={yearDataList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {

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
                                    ]}
                                    onPress={() => {
                                        this.refs._sectionList.scrollToLocation({
                                            itemIndex: 0,
                                            sectionIndex: index,
                                            viewOffset: 1,
                                        });
                                        // console.log("this.refs._sectionList.props",this.refs._sectionList.props);
                                        // console.log("this.refs._sectionList.props",this.refs._sectionList.props);
                                        // console.log("this.refs._sectionList.props.sectionIndex",this.refs._sectionList.props.sectionIndex);
                                        // console.log("this.refs._sectionList.itemIndex",this.refs._sectionList.itemIndex);
                                    }}
                                >
                                    <Text style={[{
                                        fontSize: 16,
                                    }]}>
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
                        // onViewableItemsChanged={(data)=>{
                        //     console.log("onViewableItemsChanged.changed",data.changed);
                        //     console.log("onViewableItemsChanged.changed",data.changed[0].section);
                        // }}
                        renderItem={({item, index}) => this._renderItem(item, index)}
                        renderSectionHeader={this._renderSectionHeader.bind(this)}
                        sections={yearDataSessionList}
                        keyExtractor={(item, index) => item + index}
                        ItemSeparatorComponent={() => <View/>}
                    />

                </View>

            </SafeAreaView>
        );
    };

    _renderSectionHeader(sectionItem) {
        const {section} = sectionItem;
        return (
            <View style={{
                height: 30,
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

    _renderItem(item, index) {
        return (
            <TouchableOpacity
                style={[styles.itemRowContainerCommon, this.getItemRowContainerStyle(item)]}
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
                        },this.getItemRowTextStyle(item)]}>
                            {item.format('MM月')}
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
                let year1 = datePickData.startDate.year();
                let year2 = item.year();
                if (year2 < year1) {
                    datePickData.startDate = item;
                } else if (year2 === year1) {
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
            onUpdatePickDate && onUpdatePickDate(3, datePickData);
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
            console.log("datePickData.startDate",datePickData.startDate.diff(item,'month'));
            console.log("datePickData.endDate",datePickData.endDate.diff(item,'month'));
            // let startMonthStr = parseInt(`${datePickData.startDate.year()}${datePickData.startDate.month()}`);
            // let endMonthStr =parseInt(`${datePickData.endDate.year()}${datePickData.endDate.month()}`);
            // let itemMonthStr =parseInt(`${item.year()}${item.month()}`);
            //
            // if(itemMonthStr>=startMonthStr && itemMonthStr<=endMonthStr){
            //     return styles.activeItemRowContainer;
            // }
            // console.log("startMonthStr",startMonthStr);
            // console.log("endMonthStr",endMonthStr);

            let startYear = datePickData.startDate.year();
            let endYear = datePickData.endDate.year();
            let itemYear = item.year();
            if (itemYear >= startYear && itemYear <= endYear) {
                return styles.activeItemRowContainer;
            }
            // return styles.activeItemRowContainer;
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
        height: 50,
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
    activeItemRowText: {
        color: '#2988ff',
    },
    inactiveItemRowText: {
        color: '#666666',
    },
});
