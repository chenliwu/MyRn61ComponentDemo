import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator
} from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

export default class LoadingDialogExample extends React.Component {

    static navigationOptions = {
        headerTitle: '输入对话框',
    };

    constructor(props) {
        super(props);
        this.state = {
            defaultAnimationDialog: false,
            password: ''
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Button title="打开输入对话框" onPress={() => {
                    this.setState({
                        defaultAnimationDialog: true,
                    });
                }}/>


                <Dialog
                    onDismiss={() => {
                        this.setState({defaultAnimationDialog: false});
                    }}
                    width={0.8}
                    visible={this.state.defaultAnimationDialog}
                    rounded
                    overlayBackgroundColor='#00000000'  //设置遮盖层的背景色
                    // dialogStyle={{
                    //     backgroundColor: 'rgba(0,0,0,0.8)',
                    // }}
                    //dialogAnimation={new ScaleAnimation()}  //动画效果
                    // onHardwareBackPress={()=>{
                    //     return false;
                    // }}

                    dialogTitle={
                        <DialogTitle
                            title="密码校验"
                            textStyle={{
                                color: '#fff'
                            }}
                            style={{
                                backgroundColor: '#337ab7',
                            }}
                            hasTitleBar={false}
                            align="left"
                        />
                    }

                    actions={[
                        <DialogButton
                            text="确定"
                            textStyle={{
                                color: '#337ab7'
                            }}
                            onPress={() => {
                                alert(this.state.password);
                                this.setState({defaultAnimationDialog: false});
                            }}
                            key="submit"
                        />,
                        <DialogButton
                            text="取消"
                            textStyle={{
                                color: '#337ab7'
                            }}
                            onPress={() => {
                                this.setState({defaultAnimationDialog: false});
                            }}
                            key="cancel"
                        />,
                    ]}

                >
                    <DialogContent
                        style={{
                            padding: 20,
                            justifyContent: 'center',
                            //alignItems:'center',
                            //backgroundColor: 'red',
                        }}
                    >
                        <TextInput
                            autoFocus={true}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                            placeholder="请输入密码"
                        />
                    </DialogContent>
                </Dialog>

            </View>
        )
    }

}