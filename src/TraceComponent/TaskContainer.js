import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import pxToDp from '@utils/pxToDp';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class TaskContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            totalDuration: 0,
            status: 0,
        };
    }

    componentWillMount = () => {
        const {task} = this.props;
        let totalDuration = 0;
        let status = 0;
        for (let item of task.taskList) {
            if (!item.duration) {
                continue;
            }
            totalDuration += item.duration;
            if (status < 1 && item.status === 1) {
                status = 1;
            } else if (status < 2 && item.status >= 2) {
                status = item.status;
            }
        }
        this.setState({totalDuration: totalDuration});
        this.setState({status: status});
    };

    render = () => {
        const {task} = this.props;
        return (
            <View style={{
                flex: 1,
                // height: 400,
                flexDirection: 'column',
                borderRadius: 10,
                backgroundColor: '#fff',
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
                // paddingTop: 20,
                paddingLeft: 15,
                paddingRight: 15,
                // paddingBottom: 15,
            }}>
                <View style={{
                    // flex: 1,
                    height: 40,
                    justifyContent: 'center',
                    borderBottomWidth: pxToDp(1),
                    borderBottomColor: '#EFEFEF',
                    // backgroundColor: 'green',
                }}>
                    <Text style={{color: '#333333', fontWeight: 'bold'}}>
                        {
                            task.taskName
                                ? task.taskName
                                : '审批进度'
                        }
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    marginTop: 10,
                }}>
                    {
                        this.renderTaskList(task.taskList)
                    }
                </View>
            </View>
        );
    };

    renderTaskList = (taskList) => {
        let list = taskList.sort((a, b) => {
            return a.endTime - b.endTime;
        });
        return (
            list.map((node, nIndex) => {
                return this.renderTaskNodeInfo(node, nIndex, list.length);
            })
        );
    };

    renderTaskNodeInfo = (node, index, totalLength) => {
        console.log('node', node);
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                // backgroundColor: 'pink',
            }}>

                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                    // backgroundColor: '#ffffff',
                }}>
                    {
                        this.renderAvatar(node)
                    }

                    {/*<View style={{*/}
                    {/*    width: 5,*/}
                    {/*    height: 5,*/}
                    {/*    borderRadius: 5,*/}
                    {/*    marginTop: 5,*/}
                    {/*    backgroundColor: '#3BE0FF',*/}
                    {/*}}/>*/}
                    {/*<View style={{*/}
                    {/*    flex: 1,*/}
                    {/*    marginTop: node.type === 'applicant' ? 0 : 5,*/}
                    {/*    width: 2,*/}
                    {/*    minHeight: 35,*/}
                    {/*    backgroundColor: '#95EFFF',*/}
                    {/*}}/>*/}

                    {
                        node.type === 'applicant'
                            ? <View style={{
                                width: 5,
                                height: 5,
                                borderRadius: 5,
                                marginTop: 3,
                                backgroundColor: '#3BE0FF',
                            }}/>
                            : null
                    }
                    {
                        index === totalLength - 1
                            ? <View style={{
                                flex: 1,
                                marginTop: node.type === 'applicant' ? 0 : 3,
                                width: 2,
                                minHeight: 35,
                            }}/>
                            : <View style={{
                                flex: 1,
                                marginTop: node.type === 'applicant' ? 0 : 3,
                                width: 2,
                                minHeight: 35,
                                backgroundColor: '#95EFFF',
                            }}/>
                    }


                    {
                        // 倒数第二个结点，任务连接线有圆点
                        index === totalLength - 2
                            ? <View style={{
                                width: 5,
                                height: 5,
                                borderRadius: 5,
                                backgroundColor: '#3BE0FF',
                            }}/>
                            : null
                    }

                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <View style={{
                        // flex:1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{color: '#333333', fontWeight: 'bold', fontSize: 16}}>
                            {
                                node.type === 'applicant'
                                    ? '发起审批'
                                    : this.getApproveStatusText(node)
                            }
                        </Text>
                        <Text style={{color: '#999999', fontSize: 12}}>
                            日期
                        </Text>
                    </View>
                    <View style={{
                        // flex:1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            color: '#999999',
                            fontSize: 14,
                        }}>
                            {node.username}{node.userCode ? '|' + node.userCode : null}
                        </Text>
                    </View>

                    <View style={{
                        // flex:1,
                        paddingTop: 5,
                        paddingBottom: 5,
                        flexDirection: 'row',
                    }}>
                        <Text>审批意见；</Text>
                        {/*<Text>手写审批；</Text>*/}
                    </View>

                </View>
            </View>
        );
    };


    renderAvatar = (node) => {
        if (node.type === 'applicant') {
            return this.renderApplicantAvatar();
        }
        if (node.endTime) {
            return this.renderApprovedAvatar();
        } else {
            return this.renderTodoApproveAvatar();
        }
    };

    renderApplicantAvatar = () => {
        return (
            <View style={{
                paddingTop: 5,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: 'red',
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
        );
    };

    renderApprovedAvatar = () => {
        return (
            <View style={{
                paddingTop: 5,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: 'blue',
            }}>
                <Image source={require('@assets/icons/tracePage/icon_approved_avatar.png')}/>
                <Image
                    style={{
                        position: 'absolute',
                        right: -3,
                        bottom: -3,
                    }}
                    source={require('@assets/icons/tracePage/icon_approved_checked.png')}/>
            </View>
        );
    };

    renderTodoApproveAvatar = () => {
        return (
            <View style={{
                paddingTop: 5,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: 'green',
            }}>
                <Image source={require('@assets/icons/tracePage/icon_todo_approve_avatar.png')}/>
            </View>

        );
    };

    renderTodoApproveNode = () => {

    };

    getApproveStatusText = (node) => {
        if (node.endTime) {
            return '已审批';
        } else {
            return '待审批';
        }
    };

}

const styles = StyleSheet.create({
    taskNodeTitleText: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
