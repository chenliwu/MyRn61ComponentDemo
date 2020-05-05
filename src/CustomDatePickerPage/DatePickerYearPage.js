/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

import moment from 'moment';

moment.locale('zh-cn');

/**
 * 起始选择年份
 * @type {number}
 */
const startYear = 2000;

export default class DatePickerYearPage extends React.Component {


    constructor(props) {
        super(props);
        let currentDateObj = moment();
        let currentYear = currentDateObj.year();
        this.state = {
            yearDataList: [],
            currentYear: currentYear,
        };
    }

    initYearDataList = () => {
        let currentDateObj = moment();
        let currentYear = currentDateObj.year();
        let count = currentYear - startYear;
        const yearDataList = [];
        for (let i = 0; i <= count; i++) {
            let item = moment().subtract(i, 'years');
            yearDataList.push(item);
        }
        this.setState({
            yearDataList: yearDataList,
        });
        console.log('yearDataList', yearDataList);
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

    _renderItem = ({item, index, separators}) => {
        // console.log("item",item);
        const {currentYear} = this.state;
        return (
            <TouchableOpacity
                style={{
                    borderBottomColor: '#efefef',
                    borderBottomWidth: 1,
                    paddingLeft: 20,
                }}
                onPress={() => {
                    let showInfo = item.format('YYYY年');
                }}>
                <View style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                }}>
                    <Text>
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

    _keyExtractor = (item, index) => {
        return index.toString();
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
