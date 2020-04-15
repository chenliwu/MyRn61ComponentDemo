import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";
import Dialog from "react-native-popup-dialog";

const GlobalLoadingDialogStyle = {

    //Dialog的宽度：屏幕的百分比
    loadingDialogWidthPercent: 0.35,
    //Dialog的高度
    loadingDialogHeightPercent: 0.15,

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
        fontSize: 16,
        color: '#fff',
        marginTop: 10
    }

};


/**
 * 2018-12-14
 * chenlw
 * work：封装Loading对话框代码
 * @param loadingDialogVisible  对话框是否显示
 * @param loadingHintText  加载提示文本
 * @returns {*}
 * @constructor
 */
function LoadingDialog({loadingDialogVisible, loadingHintText}) {
    return (
        <Dialog
            width={GlobalLoadingDialogStyle.loadingDialogWidthPercent}
            height={GlobalLoadingDialogStyle.loadingDialogHeightPercent}
            visible={loadingDialogVisible}
            rounded
            overlayBackgroundColor={GlobalLoadingDialogStyle.overlayBackgroundColor}
            dialogStyle={GlobalLoadingDialogStyle.dialogStyle}
        >
            <View style={GlobalLoadingDialogStyle.dialogContentContainerStyle}>
                <ActivityIndicator size="large"/>
                <Text
                    style={GlobalLoadingDialogStyle.loadingHintTextStyle}>{loadingHintText}</Text>
            </View>
        </Dialog>
    );
}

export {LoadingDialog};