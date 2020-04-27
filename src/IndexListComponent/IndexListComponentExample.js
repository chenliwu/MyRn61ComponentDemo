/**
 *
 * @author chenlw
 * @date 2020/04/18
 */
import React from 'react';
import {Dimensions, FlatList, SectionList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';

import pinyin from 'pinyin';

let testData = [
    {name: '盖伦'},
    {name: '崔丝塔娜'},
    {name: '大发明家'},
    {name: '武器大师'},
    {name: '武器大师'},
    {name: '刀妹'},
    {name: '卡特琳娜'},
    {name: '盲僧'},
    {name: '蕾欧娜'},
    {name: '拉克丝'},
    {name: '剑圣'},
    {name: '赏金'},
    {name: '发条'},
    {name: '瑞雯'},
    {name: '提莫'},
    {name: '卡牌'},
    {name: '剑豪'},
    {name: '琴女'},
    {name: '木木'},
    {name: '雪人'},
    {name: '安妮'},
    {name: '薇恩'},
    {name: '小法师'},
    {name: '艾尼维亚'},
    {name: '奥瑞利安索尔'},
    {name: '布兰德'},
    {name: '凯特琳'},
    {name: '虚空'},
    {name: '机器人'},
    {name: '挖掘机'},
    {name: 'EZ'},
    {name: '暴走萝莉'},
    {name: '艾克'},
    {name: '波比'},
    {name: '赵信'},
    {name: '牛头'},
    {name: '九尾'},
    {name: '菲兹'},
    {name: '寒冰'},
    {name: '猴子'},
    {name: '深渊'},
    {name: '凯南'},
    {name: '诺克萨斯'},
    {name: '祖安'},
    {name: '德莱文'},
    {name: '德玛西亚王子'},
    {name: '豹女'},
    {name: '皮城执法官'},
    {name: '泽拉斯'},
    {name: '岩雀'},
];

export default class IndexListComponentExample extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            sections: [],       //section数组
            // letterArr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],      //首字母数组
            letterArr: [],      //首字母数组

            activeLetterIndex: 0,
            showIndex: -1,

        };
    }

    componentWillMount = () => {
        // 暂时静态数据替换
        //获取联系人列表
        let list = testData;
        let sections = [], letterArr = [];

        // 右侧字母栏数据处理
        list.map((item, index) => {

            letterArr.push(pinyin(item.name.substring(0, 1), {
                style: pinyin.STYLE_FIRST_LETTER,
            })[0][0].toUpperCase());

            letterArr = [...new Set(letterArr)].sort();

            this.setState({letterArr: letterArr});
        });

        // 分组数据处理
        letterArr.map((item, index) => {
            sections.push({
                title: item,
                data: [],
            });
        });

        list.map(item => {
            let listItem = item;
            sections.map(item => {
                let first = listItem.name.substring(0, 1);
                let test = pinyin(first, {style: pinyin.STYLE_FIRST_LETTER})[0][0].toUpperCase();

                if (item.title == test) {
                    item.data.push({firstName: first, name: listItem.name});
                }
            });
        });

        this.setState({sections: sections});
    };

    // 字母关联分组跳转
    _onSectionselect = (key) => {
        console.log('_onSectionselect.key', key);
        this.setState({
            activeLetterIndex: key,
        }, () => {

        });
        this.refs._sectionList.scrollToLocation({
            itemIndex: 0,
            sectionIndex: key,
            viewOffset: 20,
        });

    };

    // 分组列表的头部
    _renderSectionHeader(sectionItem) {
        const {section} = sectionItem;
        return (
            <View style={{
                height: 20,
                backgroundColor: '#e7f0f9',
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Text style={{fontSize: 16}}>{section.title.toUpperCase()}</Text>
            </View>
        );
    }


    _renderItem(item, index) {
        const {showIndex} = this.state;
        return (
            <TouchableOpacity
                style={{
                    paddingLeft: 20,
                    paddingRight: 30,
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#efefef',
                }}
                activeOpacity={.75}
                onPress={() => {
                    this.setState({
                        showIndex: item.name,
                    });
                }}
            >
                <View style={{
                    // marginLeft: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    flexGrow: 1,
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: '#2988FF',
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                        }}>
                            {item.firstName}
                        </Text>
                    </View>
                    <View style={{
                        marginLeft: 10,
                    }}>
                        <Text style={{}}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    render = () => {
        const {letterArr, sections, activeLetterIndex} = this.state;
        //偏移量 = （设备高度 - 字母索引高度 - 底部导航栏 - 顶部标题栏 - 24）/ 2
        const top_offset = (Dimensions.get('window').height - letterArr.length * 22 - 52 - 44 - 24) / 2;
        return (
            <SafeAreaView style={{
                flex: 1,

            }}>
                <SectionList
                    ref="_sectionList"
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    renderSectionHeader={this._renderSectionHeader}
                    sections={sections}
                    keyExtractor={(item, index) => item + index}
                    ItemSeparatorComponent={() => <View/>}
                    // onViewableItemsChanged={(viewableItems)=>{
                    //     // console.log("onViewableItemsChanged.viewableItems",viewableItems);
                    //     // console.log("onViewableItemsChanged.viewableItems.changed",viewableItems.changed);
                    // }}
                />

                {/*右侧字母栏*/}
                <View style={{position: 'absolute', width: 26, right: 0, top: top_offset}}>
                    <FlatList
                        data={letterArr}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                            let isActive = index === activeLetterIndex;
                            // let textStyle = isActive ? styles.activeIndicatorText : styles.inactiveIndicatorText;
                            // let containerStyle = isActive ? styles.activeIndicatorContainer : styles.inactiveIndicatorContainer;
                            let textStyle = styles.inactiveIndicatorText;
                            let containerStyle = styles.inactiveIndicatorContainer;
                            return (
                                <TouchableOpacity
                                    style={[
                                        {
                                            marginVertical: 2,
                                            height: 16,
                                            width: 16,
                                            borderRadius: 8,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        },
                                        containerStyle,
                                    ]}
                                    onPress={() => {
                                        this._onSectionselect(index);
                                    }}
                                >
                                    <Text style={[{
                                        fontSize: 12,
                                    }, textStyle]}>
                                        {item.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    taskNodeTitleText: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inactiveIndicatorContainer: {
        // color: '#666666',
    },
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
