import React, {Component} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import pxToDp from '../DialogComponent/utils/pxToDp';

import TaskContainer from './TaskContainer';

const applicantInfo = {
    type: 'applicant',
    username: '审批用户名1',
    userCode: '审批用户代码1',
    createTime: 1586843000837,
};

const testTraceData = [
    [
        {
            taskName: '测试结点1',
            taskList: [
                {
                    username: '审批用户名1',
                    userCode: '审批用户代码1',
                    createTime: 1586843000837,
                    endTime: 1586843060837,
                    duration: 60000,
                    status: 1,
                    comment: '同意',
                    drawComment: '',
                },
                {
                    username: '审批用户名2',
                    userCode: '审批用户代码2',
                    createTime: 1586843000837,
                    endTime: 1586843060837,
                    duration: 60000,
                    status: 2,
                    comment: '打回上一级',
                    drawComment: '',
                },
                {
                    username: '审批用户名3',
                    userCode: '审批用户代码3',
                    createTime: 1586843000837,
                    endTime: 1586843060837,
                    duration: 60000,
                    status: 3,
                    comment: '打回制单处',
                    drawComment: '',
                },
                {
                    username: '审批用户名4',
                    userCode: '审批用户代码4',
                    createTime: 1586843000837,
                    endTime: null,
                    duration: null,
                    status: null,
                    comment: null,
                    drawComment: null,
                },
            ],
        },

        {
            taskName: '测试结点2',
            taskList: [
                {
                    username: '审批用户名1',
                    userCode: '审批用户代码1',
                    createTime: 1586843000837,
                    endTime: 1586843060837,
                    duration: 60000,
                    status: 1,
                    comment: '同意',
                    drawComment: '',
                },
                {
                    username: '审批用户名2',
                    userCode: '审批用户代码2',
                    createTime: 1586843000837,
                    endTime: 1586843060837,
                    duration: 60000,
                    status: 2,
                    comment: '打回上一级',
                    drawComment: '',
                },
                {
                    username: '审批用户名3',
                    userCode: '审批用户代码3',
                    createTime: 1586843000837,
                    endTime: 1586843060837,
                    duration: 60000,
                    status: 3,
                    comment: '打回制单处',
                    drawComment: '',
                },
            ],
        },

    ],
];


testTraceData.forEach((instanceList, index, arr) => {
    instanceList.forEach((item, index1, arr1) => {
        if (item.taskList) {
            item.taskList = [applicantInfo].concat(item.taskList);
        }
    });
});
console.log('testTraceData', testTraceData);
console.log('testTraceData.taskList', testTraceData[0].taskList);

export default class TraceComponentIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1,backgroundColor:'#F5F5F5'}}>
                <ScrollView style={{
                    flex: 1,
                }}>

                    {
                        testTraceData.map((instanceList, index, arr) => {
                            return this.renderFlowTrack(instanceList);
                        })
                    }

                </ScrollView>


            </SafeAreaView>
        );
    }

    renderFlowTrack = (instanceList) => {
        return instanceList.map((task, index, arr) => {
            return (
                <TaskContainer key={'TaskContainer' + index} task={task}/>
            );
        });

    };

    renderTaskNodeInfo = () => {
        return (
            <View style={{
                flex: 1,
                marginTop: 10,
                flexDirection: 'row',
            }}>

                <View style={{
                    // flex:1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    backgroundColor: '#ffffff',
                }}>
                    <View style={{
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image source={require('@assets/icons/tracePage/icon_applicant_avatar.png')}/>
                        <Image
                            style={{
                                position: 'absolute',
                                right: -3,
                                bottom: -3,
                            }}
                            source={require('@assets/icons/tracePage/icon_approved_checked.png')}/>
                    </View>

                    <View style={{
                        width: 5,
                        height: 5,
                        borderRadius: 5,
                        marginTop: 5,
                        backgroundColor: '#3BE0FF',
                    }}/>
                    <View style={{
                        flex: 1,
                        width: 2,
                        height: 20,
                        backgroundColor: '#95EFFF',
                    }}/>

                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <View style={{
                        // flex:1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'red',
                    }}>
                        <Text style={{color: '#333333', fontWeight: 'bold', fontSize: 16}}>审批状态</Text>
                        <Text style={{color: '#999999', fontSize: 12}}>日期</Text>
                    </View>
                    <View style={{
                        // flex:1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'red',
                    }}>
                        <Text style={{color: '#999999', fontSize: 14}}>申请人</Text>
                    </View>
                    <View style={{
                        // flex:1,
                        flexDirection: 'row',
                        backgroundColor: 'red',
                    }}>
                        <Text>审批意见；</Text>
                        <Text>手写审批；</Text>
                    </View>

                </View>
            </View>
        );
    };

    getApproveStatusText = (status) => {
        switch (status) {
            case 1:
                return '同意';
            case 2:
                return '打回上一级';
            case 3:
                return '打回制单';
        }
    };

    getApproveStatusTextStyle = (detail) => {
        return '#FF842A';
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentView: {
        // flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        // backgroundColor: '#000',
        // opacity: 0.4,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
    },
    navigationTitle: {
        padding: 10,
    },
    navigationButton: {
        padding: 10,
    },
    navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
    },
    navigator: {
        flex: 1,
        // backgroundColor: '#000000',
    },
    customBackgroundDialog: {
        opacity: 0.5,
        backgroundColor: '#000',
    },
});
