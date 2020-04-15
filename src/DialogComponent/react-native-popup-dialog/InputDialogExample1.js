import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions
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
            inputTextDialogVisible: false,
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
                        inputTextDialogVisible: true,
                    });
                }}/>


                <Dialog
                    onDismiss={() => {
                        this.setState({inputTextDialogVisible: false});
                    }}
                    width={0.8}
                    visible={this.state.inputTextDialogVisible}
                    rounded
                >
                    <DialogContent
                        style={{
                            padding: 20,
                            justifyContent: 'center',
                            alignItems:'center',
                            //alignItems:'center',
                            //backgroundColor: 'red',
                        }}
                    >
                        <Text style={{fontSize: 20, color: "#000"}}>密码校验</Text>
                        <View style={{height: 10}}/>
                        <TextInput
                            underlineColorAndroid={"transparent"}
                            autoFocus={true}
                            secureTextEntry={true}
                            value={this.state.txtPassword}
                            onChangeText={text => this.setState({txtPassword: text})}
                            style={{
                                padding: 0,
                                height: 50,
                                width: Dimensions.get('window').width - 180,
                                fontSize: 18
                            }}
                            maxLength={30}
                            placeholder='请输入登录密码'
                            autoCapitalize={'none'}
                        />
                        <View style={{height: 10}}/>

                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity
                                style={{flex: 1, alignItems: "center"}}
                                onPress={() => {
                                    this.setState({inputTextDialogVisible: false});
                                }}>
                                <Text style={{fontSize: 18}}>确定</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{flex: 1, alignItems: "center"}}
                                onPress={() => {
                                    this.setState({inputTextDialogVisible: false});
                                }}>
                                <Text style={{fontSize: 18}}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </DialogContent>
                </Dialog>

            </View>
        )
    }

}