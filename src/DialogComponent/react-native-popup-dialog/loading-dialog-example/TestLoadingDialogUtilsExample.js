import React from 'react';
import {
    Button,
    View,
} from 'react-native';


import {
    LoadingDialog
} from './../../utils/LoadingDialogUtils';

/**
 * dialog-component分支
 */
export default class TestLoadingDialogUtilsExample extends React.Component {

    static navigationOptions = {
        headerTitle: '测试加载对话框工具类',
    };

    constructor(props) {
        super(props);
        this.state = {
            defaultAnimationDialog: false,

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

                <LoadingDialog
                    loadingDialogVisible={this.state.loadingDialogVisible}
                    loadingHintText={this.state.loadingHintText}
                />


            </View>
        )
    }

}