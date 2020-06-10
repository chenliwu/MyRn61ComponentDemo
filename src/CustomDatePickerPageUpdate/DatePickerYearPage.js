/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const ITEM_HEIGHT = 50;     // item的高度

export default class DatePickerYearPage extends React.Component {


    constructor(props) {
        super(props);
        let currentDateObj = moment();
        let currentYear = currentDateObj.year();
        this.state = {
            yearDataList: [],
            minYear: 2000,
            maxYear: currentYear,
            currentYear: currentYear,
            datePickData: {
                startDate: null,
                endDate: null,
            },
        };
    }

    initYearDataList = () => {
        const {minYear, maxYear} = this.state;
        const yearDataList = [];
        for (let i = maxYear; i >= minYear; i--) {
            let item = moment().year(i);
            yearDataList.push(item);
        }
        this.setState({
            yearDataList: yearDataList,
        });
    };

    componentWillMount = () => {
        this.initYearDataList();
    };


    render = () => {
        return (
            <SafeAreaView style={{
                flex: 1,
            }}>
                {
                    this.renderYearList()
                }
            </SafeAreaView>
        );
    };


    renderYearList = () => {
        return (
            <FlatList
                style={{
                    flex: 1,
                }}
                data={this.state.yearDataList}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    };

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

    _renderItem = ({item, index, separators}) => {
        const {currentYear} = this.state;
        return (
            <TouchableOpacity
                style={[styles.itemRowContainerCommon, this.getItemRowContainerStyle(item)]}
                onPress={() => {
                    this.onItemClick(item);
                }}>
                <View style={{}}>
                    <Text style={[this.getItemRowTextStyle(item)]}>
                        {
                            item.format('YYYY年')
                        }
                        {
                            currentYear === item.year()
                                ? ' 本年'
                                : null
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    /**
     * 行容器样式
     * @param item
     * @returns {{backgroundColor: string}|{backgroundColor: string}}
     */
    getItemRowContainerStyle = (item) => {
        const {datePickData} = this.state;
        if (datePickData.startDate && datePickData.endDate) {
            let startYear = datePickData.startDate.year();
            let endYear = datePickData.endDate.year();
            let itemYear = item.year();
            if (itemYear >= startYear && itemYear <= endYear) {
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
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        paddingLeft: 20,
        justifyContent: 'center',
        height: ITEM_HEIGHT,
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
