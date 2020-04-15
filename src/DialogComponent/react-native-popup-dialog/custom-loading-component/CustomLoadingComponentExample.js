import React from 'react';
import {
    ActivityIndicator,
    Button,
    Text,
    View,
    Image
} from 'react-native';

import Dialog from "react-native-popup-dialog";

import pxToDp from './../../utils/pxToDp';

const GlobalLoadingDialogStyle = {

    //Dialog的宽度：屏幕的百分比
    dialogWidthPercent: 0.35,
    //Dialog的高度
    dialogHeightPercent: 0.15,

    //设置遮盖层的背景色
    overlayBackgroundColor: '#00000000',
    //Dialog样式
    dialogStyle: {
        backgroundColor: 'rgba(0,0,0,0.8)',
    },

    //Dialog内容容器的样式
    dialogContentContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    //提示文字的样式
    loadingHintTextStyle: {
        color: '#fff',
        marginTop: 10
    }

};

const appIcon = require('../../../assets/icons/appIcon.png');

/**
 * dialog-component分支
 */
export default class CustomLoadingComponentExample extends React.Component {

    static navigationOptions = {
        headerTitle: '自定义加载层组件',
    };

    constructor(props) {
        super(props);
        this.state = {
            loadingDialogVisible: false,    //是否显示加载层
            loadingHintText: null,          //加载层提示语
        }
    }

    /**
     * 打开加载对话框
     * @param loadingHintText 提示文本
     */
    showLoadingDialog = (loadingHintText) => {
        this.setState({
            loadingDialogVisible: true,
            loadingHintText: loadingHintText,
        });
    };

    /**
     * 关闭加载对话框
     */
    closeLoadingDialog = () => {
        this.setState({
            loadingDialogVisible: false,
            loadingHintText: null,
        });
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Button title="打开loadingDialog" onPress={() => {
                    this.showLoadingDialog('加载中...');
                    setTimeout(() => {
                        this.closeLoadingDialog();
                    }, 3000);
                }}/>

                <Dialog
                    onDismiss={() => {
                        this.setState({loadingDialogVisible: false});
                    }}
                    width={GlobalLoadingDialogStyle.dialogWidthPercent}
                    height={GlobalLoadingDialogStyle.dialogHeightPercent}
                    visible={this.state.loadingDialogVisible}
                    rounded
                    // containerStyle={{   //设置dialog容器样式，这个容器布满整个屏幕
                    //     backgroundColor: '#00000000'
                    // }}
                    overlayBackgroundColor={GlobalLoadingDialogStyle.overlayBackgroundColor}  //设置遮盖层的背景色
                    dialogStyle={GlobalLoadingDialogStyle.dialogStyle}
                    //dialogAnimation={new ScaleAnimation()}  //动画效果
                    // onHardwareBackPress={()=>{
                    //     return false;
                    // }}
                >
                    <View style={GlobalLoadingDialogStyle.dialogContentContainerStyle}>
                        <Image
                            source={appIcon}
                            style={{
                                width: pxToDp(110),
                                height: pxToDp(110)
                            }}
                        />
                        <Text style={GlobalLoadingDialogStyle.loadingHintTextStyle}>{this.state.loadingHintText}</Text>
                    </View>
                </Dialog>


            </View>
        )
    }

}