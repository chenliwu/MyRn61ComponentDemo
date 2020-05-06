import moment from 'moment';


moment.locale('zh-cn');

/**
 * 起始选择年份
 * @type {number}
 */
const startYear = 2000;

export default class CustomDatePickerUtils {

    static  getPickYearDataList = () => {
        let currentDateObj = moment();
        let currentYear = currentDateObj.year();
        let count = currentYear - startYear;
        const yearDataList = [];
        for (let i = 0; i <= count; i++) {
            let item = moment().subtract(i, 'years');
            yearDataList.push(item);
        }
        return yearDataList;
    };
}
