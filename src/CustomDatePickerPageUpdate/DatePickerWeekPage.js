/**
 *
 * @author chenlw
 * @date 2020/05/01
 */
import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import moment from 'moment';
import 'moment/locale/zh-cn';
import CustomDatePickerUtils from './CustomDatePickerUtils';

moment.locale('zh-cn');

const ITEM_HEIGHT = 50;     // item的高度
const HEADER_HEIGHT = 30;   // 分组头的高度

export default class DatePickerWeekPage extends React.Component {

    static yearDataSessionList = null;

    constructor(props) {
        super(props);
        let currentDateObj = moment();
        let currentMonth = currentDateObj.month();
        let currentYear = currentDateObj.year();
        // this.testWeekOperate();
        this.state = {
            isLoading: true,
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

    testWeekOperate = () => {
        console.log('根据 ISO 星期获取当前 moment 年份的周数。', moment().isoWeeksInYear());

        console.log('获取或设置 ISO 周年。 ', moment().isoWeekYear());
        console.log('获取或设置年份的日期。 ', moment().dayOfYear());
        // 获取本周周一0时0分0秒
        console.log('获取本周周一:', moment().startOf('isoWeek'));
        console.log('本周周一在年份中的第几周：', moment().startOf('isoWeek').format('w'));
        // 获取本周周日23时59分59秒 moment().endOf('isoWeek')
        console.log('获取本周最后一天:', moment().endOf('isoWeek'));
        console.log('本周周一在年份中的第几周:', moment().endOf('isoWeek').format('w'));

        let currentDateObj = moment();
        let currentYear = currentDateObj.year();
        // let startWeek = moment().startOf('isoWeek');
        // while (true) {
        //     let startWeekTemp = startWeek.clone().subtract(1, 'weeks');
        //     console.log('startWeekTemp:', startWeekTemp.format('YYYY-MM-DD'));
        //     console.log('本周周一在年份中的第几周:', startWeekTemp.format('w'));
        //     if (startWeekTemp.year() === 2018) {
        //         break;
        //     }
        //     startWeek = startWeekTemp;
        // }

        // map<年份，周数据结构数组>
        // 周数据结构:{startDate:'周一',endDate:'周日'}
        const weekDataMap = new Map();
        for (let i = currentYear; i >= CustomDatePickerUtils.START_YEAR; i--) {
            weekDataMap.set(i, []);
        }

        let weekend = moment().endOf('isoWeek');
        let startWeek = moment().startOf('isoWeek');
        console.log('----------------');
        console.log('weekend:', weekend.format('YYYY-MM-DD'));
        console.log('本周周末在年份中的第几周:', weekend.format('w'));

        console.log('startWeek:', startWeek.format('YYYY-MM-DD'));
        console.log('本周周一在年份中的第几周:', startWeek.format('w'));
        console.log('----------------');
        while (true) {
            let weekendTemp = weekend.clone().subtract(1, 'weeks');
            let startWeekTemp = startWeek.clone().subtract(1, 'weeks');
            console.log('weekend:', weekendTemp.format('YYYY-MM-DD'));
            console.log('本周周末在年份中的第几周:', weekendTemp.format('w'));
            let dataList = weekDataMap.get(weekendTemp.year());
            if (dataList) {
                dataList.push({
                    startDate: startWeekTemp,
                    endDate: weekendTemp,
                });
            }
            if (weekendTemp.year() === 2018) {
                break;
            }
            weekend = weekendTemp;
            startWeek = startWeekTemp;
        }
        console.log('weekDataMap', weekDataMap);

    };

    initDateList = () => {
        const {minYear, maxYear} = this.state;
        const yearDataList = CustomDatePickerUtils.getPickYearDataListRange(minYear,maxYear);

        let yearDataSessionList;

        if (DatePickerWeekPage.yearDataSessionList === null) {
            yearDataSessionList = [];
            let currentDateObj = moment();
            let currentYear = currentDateObj.year();
            // map<年份，周数据结构数组>
            // 周数据结构:{startDate:'周一',endDate:'周日'}
            const weekDataMap = new Map();
            for (let i = maxYear; i >= minYear; i--) {
                weekDataMap.set(i, []);
            }
            let weekend = moment().endOf('isoWeek');
            let startWeek = moment().startOf('isoWeek');
            let dataList = weekDataMap.get(currentYear);
            dataList.push({
                startDate: weekend,
                endDate: startWeek,
                startDateStamp: weekend.format('x'),
                endDateStamp: startWeek.format('x'),
                showWeekText: this.getShowWeekText(startWeek, weekend),
            });
            // console.log('loading data start time', moment().format('hh:mm:ss:SSS'));
            while (true) {
                let weekendTemp = weekend.clone().subtract(1, 'weeks');
                let startWeekTemp = startWeek.clone().subtract(1, 'weeks');
                dataList = weekDataMap.get(weekendTemp.year());
                if (dataList) {
                    dataList.push({
                        startDate: startWeekTemp,
                        endDate: weekendTemp,
                        startDateStamp: startWeekTemp.format('x'),
                        endDateStamp: weekendTemp.format('x'),
                        showWeekText: this.getShowWeekText(startWeekTemp, weekendTemp),
                    });
                }
                if (startWeekTemp.year() === CustomDatePickerUtils.START_YEAR - 1) {
                    break;
                }
                weekend = weekendTemp;
                startWeek = startWeekTemp;
            }
            yearDataList.forEach((item, index, arr) => {
                let year = item.year();
                yearDataSessionList.push({
                    title: year,
                    data: weekDataMap.get(year),
                });
            });
            DatePickerWeekPage.yearDataSessionList = yearDataSessionList;
            // console.log('loading data end time', moment().format('hh:mm:ss:SSS'));
        } else {
            yearDataSessionList = DatePickerWeekPage.yearDataSessionList;
        }
        this.setState({
            yearDataSessionList: yearDataSessionList,
            yearDataList: yearDataList,
            isLoading: false,
        }, () => {

        });
    };

    /**
     * 生成 按周选择的提示文字。
     * 时间格式化操作很耗费性能，因此在生成周列表数据的时候，就把格式化显示的文字给生成，这可以提高页面绘制性能。
     */
    getShowWeekText = (startDate, endDate) => {
        let result = '第' + endDate.format('w') + '周';
        result = result + ' (' + startDate.format('M月D日') + '-' + endDate.format('M月D日') + ')';
        return result;
    };

    componentWillMount = () => {
        // console.log('DatePickerMonthPage.componentWillMount');
    };

    componentDidMount(): void {
        // console.log('DatePickerMonthPage.componentDidMount');
        const that = this;
        this.setState({
            isLoading: true,
        }, () => {
            setTimeout(() => {
                that.initDateList();
            }, 200);
        });
    }


    render = () => {
        return (
            <SafeAreaView style={{
                flex: 1,
                flexDirection: 'row',
            }}>

                {
                    this.renderLoadingComponent()
                }
                {
                    this.renderYearListComponent()
                }
                {
                    // this.renderWeekSectionComponent()
                    this.renderDateData()
                }

            </SafeAreaView>
        );
    };

    renderLoadingComponent = () => {
        const {isLoading} = this.state;
        if (!isLoading) {
            return null;
        }
        return (
            <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={'#000'}/>
            </View>
        );
    };

    renderYearListComponent = () => {
        const {yearDataList, isLoading, activeSectionIndex} = this.state;
        if (isLoading) {
            return null;
        }
        return (
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
        );
    };

    renderDateData = () => {
        const {yearDataSessionList, isLoading, activeSectionIndex} = this.state;
        if (isLoading) {
            return null;
        }
        const data = yearDataSessionList[activeSectionIndex];
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
                                            <Text
                                                style={[
                                                    {
                                                        fontSize: 14,
                                                    },
                                                    this.getItemRowTextStyle(item),
                                                ]}
                                            >
                                                {
                                                    item.showWeekText
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
                let startDateStr = `${datePickData.startDate.startDate.format('YYYYMMDD')}`;
                let itemDateStr = `${item.startDate.format('YYYYMMDD')}`;
                if (itemDateStr < startDateStr) {
                    datePickData.startDate = item;
                } else if (itemDateStr === startDateStr) {
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
            onUpdatePickDate && onUpdatePickDate(1, datePickData);
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

            let startDateStamp = datePickData.startDate.startDateStamp;
            let endDateStamp = datePickData.endDate.endDateStamp;
            let itemStartDateStamp = item.startDateStamp;
            let itemEndDateStamp = item.endDateStamp;
            if (itemStartDateStamp >= startDateStamp && itemEndDateStamp <= endDateStamp) {
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
