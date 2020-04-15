import React, {Component} from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';

import pxToDp from './../utils/pxToDp';

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';


export default class SelectDateDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            defaultAnimationDialog: false,
            selectCustomDateDialogVisible: false,
        };
    }


    render() {

        const timeProps = {
            mode: 'date',
            format: 'YYYY-MM-DD',
            minDate: '2000-01-01',
            maxDate: '2050-12-31',
            confirmBtnText: '确定',
            cancelBtnText: '取消',
            style: {flex: 1},
            customStyles: {
                btnCancel: {padding: 5, left: 5},
                btnConfirm: {padding: 5, right: 5},
                btnTextConfirm: {color: '#2988FF'},
                dateInput: {height: pxToDp(62), borderWidth: 1, borderColor: '#D1D1D1', borderRadius: pxToDp(8)},
                dateText: {color: '#333333'},
            },
            showIcon: false,
        };

        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <Button
                        title="Show Dialog - Default Animation"
                        onPress={() => {
                            this.setState({
                                selectCustomDateDialogVisible: true,
                            });
                        }}
                    />
                </View>

                <Dialog
                    onDismiss={() => {
                        this.setState({selectCustomDateDialogVisible: false});
                    }}
                    width={0.9}
                    visible={this.state.selectCustomDateDialogVisible}
                    rounded
                    dialogTitle={
                        <DialogTitle title="选择日期"/>
                    }
                    actions={[
                        <DialogButton
                            text="取消"
                            textStyle={{color: '#333333'}}
                            onPress={() => {
                                this.setState({selectCustomDateDialogVisible: false});
                            }}
                            key="button-1"
                        />,
                        <DialogButton
                            text="确定"
                            textStyle={{color: '#2988FF'}}
                            onPress={() => {
                                this.setState({selectCustomDateDialogVisible: false});
                            }}
                            key="button-2"
                        />,
                    ]}
                >
                    <DialogContent
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <View style={{
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                // marginTop: 10,
                                padding: 10,
                            }}>
                                <DatePicker
                                    {...timeProps}
                                    date={this.state.startDate}
                                    placeholder={'开始时间'}
                                    onDateChange={(date) => {
                                        this.setState({startDate: date}, () => {

                                        });
                                    }}
                                />
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text> ~ </Text>
                                </View>
                                <DatePicker
                                    {...timeProps}
                                    date={this.state.endDate}
                                    placeholder={'结束时间'}
                                    onDateChange={(date) => {
                                        this.setState({endDate: date}, () => {

                                        });
                                    }}
                                />
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>

            </View>
        );
    }
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
