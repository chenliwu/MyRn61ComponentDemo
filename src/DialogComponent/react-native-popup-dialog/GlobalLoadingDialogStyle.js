/**
 * 2018-12-5
 * chenlw
 * work：封装LoadingDialog的全局样式
 */

const GlobalLoadingDialogStyle = {

    //Dialog的宽度：屏幕的百分比
    dialogWidthPercent: 0.4,
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

export default GlobalLoadingDialogStyle;