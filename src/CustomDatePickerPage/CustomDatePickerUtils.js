import moment from 'moment';


moment.locale('zh-cn');

export default class CustomDatePickerUtils {

    /**
     * 起始选择年份
     * @type {number}
     */
    static START_YEAR = 2000;

    static  getPickYearDataList = () => {
        // console.log("getPickYearDataList:loading data start time", moment().format("hh:mm:ss:SSS"));
        let currentDateObj = moment();
        let currentYear = currentDateObj.year();
        let count = currentYear - CustomDatePickerUtils.START_YEAR;
        const yearDataList = [];
        for (let i = 0; i <= count; i++) {
            let item = moment().subtract(i, 'years');
            yearDataList.push(item);
        }
        // console.log("getPickYearDataList:loading data end time", moment().format("hh:mm:ss:SSS"));
        return yearDataList;
    };
}
