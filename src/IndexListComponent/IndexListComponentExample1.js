/**
 *
 * @author chenlw
 * @date 2020/04/18
 */
import React from 'react';
import {
    Dimensions,
    FlatList,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
} from 'react-native';

import pinyin from 'pinyin';

let testData = [
    {id: '盖伦', name: '盖伦'},
    {id: '崔丝塔娜', name: '崔丝塔娜'},
    {id: '大发明家', name: '大发明家'},
    {id: '武器大师', name: '武器大师'},
    {id: '刀妹', name: '刀妹'},
    {id: '卡特琳娜', name: '卡特琳娜'},
    {id: '盲僧', name: '盲僧'},
    {id: '蕾欧娜', name: '蕾欧娜'},
    {id: '拉克丝', name: '拉克丝'},
    {id: '剑圣', name: '剑圣'},
    {id: '赏金', name: '赏金'},
    {id: '发条', name: '发条'},
    {id: '瑞雯', name: '瑞雯'},
    {id: '提莫', name: '提莫'},
    {id: '卡牌', name: '卡牌'},
    {id: '剑豪', name: '剑豪'},
    {id: '琴女', name: '琴女'},
    {id: '木木', name: '木木'},
    {id: '雪人', name: '雪人'},
    {id: '安妮', name: '安妮'},
    {id: '薇恩', name: '薇恩'},
    {id: '小法师', name: '小法师'},
    {id: '艾尼维亚', name: '艾尼维亚'},
    {id: '奥瑞利安索尔', name: '奥瑞利安索尔'},
    {id: '布兰德', name: '布兰德'},
    {id: '凯特琳', name: '凯特琳'},
    {id: '虚空', name: '虚空'},
    {id: '机器人', name: '机器人'},
    {id: '挖掘机', name: '挖掘机'},
    {id: 'EZ', name: 'EZ'},
    {id: '暴走萝莉', name: '暴走萝莉'},
    {id: '艾克', name: '艾克'},
    {id: '波比', name: '波比'},
    {id: '赵信', name: '赵信'},
    {id: '牛头', name: '牛头'},
    {id: '九尾', name: '九尾'},
    {id: '菲兹', name: '菲兹'},
    {id: '寒冰', name: '寒冰'},
    {id: '猴子', name: '猴子'},
    {id: '深渊', name: '深渊'},
    {id: '凯南', name: '凯南'},
    {id: '诺克萨斯', name: '诺克萨斯'},
    {id: '祖安', name: '祖安'},
    {id: '德莱文', name: '德莱文'},
    {id: '德玛西亚王子', name: '德玛西亚王子'},
    {id: '豹女', name: '豹女'},
    {id: '皮城执法官', name: '皮城执法官'},
    {id: '泽拉斯', name: '泽拉斯'},
    {id: '岩雀', name: '岩雀'},
];
const selectedFieldName = 'id';

export default class IndexListComponentExample extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            sections: [],       //section数组
            // letterArr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],      //首字母数组
            letterArr: [],      //首字母数组
            activeLetterIndex: 0,
            selectedItemSet: new Set(),

            // 是否开启批量选择模式
            batchSelected: false,
            refreshCount: 0,
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

        list.map((item1, index1, arr1) => {
            let listItem = item1;
            sections.map((item2, index2, arr2) => {
                let first = listItem.name.substring(0, 1);
                let test = pinyin(first, {style: pinyin.STYLE_FIRST_LETTER})[0][0].toUpperCase();
                if (item2.title == test) {
                    item2.data.push({
                        firstName: first,
                        name: listItem.name,
                        id: listItem.id,
                    });
                }
            });
        });

        this.setState({sections: sections});
    };

    openBatchSelectedMode = () => {
        this.setState({
            batchSelected: true,
            selectedItemSet: new Set(),
        });
    };

    closeBatchSelectedMode = () => {
        this.setState({
            batchSelected: false,
            selectedItemSet: new Set(),
        });
    };

    addOrDeleteSelectedItem = (item) => {
        const {batchSelected, selectedItemSet,refreshCount} = this.state;
        if (!batchSelected) {
            return;
        }
        if (item && item[selectedFieldName]) {
            if (selectedItemSet.has(item[selectedFieldName])) {
                selectedItemSet.delete(item[selectedFieldName]);
            } else {
                selectedItemSet.add(item[selectedFieldName]);
            }
            console.log('addOrDeleteSelectedItem.selectedItemSet', selectedItemSet);
            this.setState({
                selectedItemSet: selectedItemSet,
                refreshCount: refreshCount + 1,
            });
        }
    };


    // 字母关联分组跳转
    _onSectionselect = (key) => {
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

    renderItemSelectedIcon = (item) => {
        if (!item) {
            return;
        }
        const {batchSelected, selectedItemSet} = this.state;
        if (batchSelected) {
            let isActive = selectedItemSet.has(item[selectedFieldName]);
            return (
                <Image
                    style={{
                        width: 18,
                        height: 18,
                        marginRight: 10,
                    }}
                    source={isActive
                        ? require('@assets/icons/common/icon_item_selected.png')
                        : require('@assets/icons/common/icon_item_unselected.png')}
                />
            );
        } else {
            return null;
        }
    };

    _renderItem(item, index) {
        const {batchSelected} = this.state;
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
                onLongPress={() => {
                    if (!batchSelected) {
                        this.addOrDeleteSelectedItem(item);
                        this.openBatchSelectedMode();
                    }
                }}
                onPress={() => {
                    this.addOrDeleteSelectedItem(item);
                }}
            >
                {
                    this.renderItemSelectedIcon(item)
                }
                <View style={{
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

    renderBatchSelectedHeader = () => {
        const {batchSelected,selectedItemSet} = this.state;
        if (!batchSelected) {
            return null;
        }
        return (
            <View style={{
                paddingLeft: 10,
                paddingRight: 10,
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={{}}>
                    <Text>已选择{selectedItemSet.size}条记录</Text>
                </View>
                <TouchableOpacity
                    style={{
                        padding: 10,
                    }}
                    onPress={() => {
                        this.closeBatchSelectedMode();
                    }}
                >
                    <Text>确定</Text>
                </TouchableOpacity>
            </View>
        );
    };


    render = () => {
        const {letterArr, sections, activeLetterIndex, batchSelected} = this.state;
        //偏移量 = （设备高度 - 字母索引高度 - 底部导航栏 - 顶部标题栏 - 24）/ 2
        const top_offset = (Dimensions.get('window').height - letterArr.length * 22 - 52 - 44 - 24) / 2;
        return (
            <SafeAreaView style={{
                flex: 1,

            }}>
                {
                    this.renderBatchSelectedHeader()
                }
                <SectionList
                    extraData={this.state}
                    ref="_sectionList"
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
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
