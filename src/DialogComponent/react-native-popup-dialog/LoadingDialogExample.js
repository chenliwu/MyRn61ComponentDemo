import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

import GlobalLoadingDialogStyle from './GlobalLoadingDialogStyle';

/**
 * dialog-component分支
 */
export default class LoadingDialogExample extends React.Component {

    static navigationOptions = {
        headerTitle: '加载对话框',
    };

    constructor(props) {
        super(props);
        this.state = {
            defaultAnimationDialog: false
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Button title="打开loadingDialog" onPress={() => {
                    this.setState({
                        defaultAnimationDialog: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            defaultAnimationDialog: false,
                        });
                    }, 3000);
                }}/>


                <Dialog
                    onDismiss={() => {
                        this.setState({defaultAnimationDialog: false});
                    }}
                    width={GlobalLoadingDialogStyle.dialogWidthPercent}
                    height={GlobalLoadingDialogStyle.dialogHeightPercent}
                    visible={this.state.defaultAnimationDialog}
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
                        <ActivityIndicator size="large"/>
                        <Text style={GlobalLoadingDialogStyle.loadingHintTextStyle}>加载中...</Text>
                    </View>
                </Dialog>

            </View>
        )
    }

}