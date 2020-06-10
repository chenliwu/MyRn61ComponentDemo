import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

// 月份总天数，闰年2月为29天
const daysOfMonth = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
];

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

    static  getPickYearDataListRange = (minYear,maxYear) => {
        const yearDataList = [];
        for (let i = maxYear; i >= minYear; i--) {
            let item = moment().year(i);
            yearDataList.push(item);
        }
        return yearDataList;
    };


    /**
     * 获取指定月份的总天数
     * @param year  年份
     * @param month 月份: 0(一月)到11(十二月)之间的一个整数。
     */
    static getDaysOfMonth = (year, month) => {
        if (CustomDatePickerUtils.isLeap(year)) {
            return daysOfMonth[1][month];
        }
        return daysOfMonth[0][month];
    };

    /**
     * 判断是否为闰年
     * @param year
     * @returns {number}
     */
    static isLeap(year) {
        // 闰年的条件是符合下面二者之一：
        // (1)年份能被4整除，但不能被100整除；
        // (2)年份能被400整除。
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return 1;
        }
        return 0;
    }

    /**
     * 获取月份日历的二维数组
     * - 列下标：星期中的第几天，数字表示: 0到6，0表示周日，6表示周六
     * - data[0][5]=1表示：  当月1号为星期五
     *
     * @param year
     * @param month
     * @returns {[]}
     */
    static getMonthDaysCalendarArray = (year, month) => {
        // 获取当前月第一天Date
        const first_date = new Date(year, month, 1);
        // 获取当前月第一天是星期几: 返回date对象星期中的一天，此值为0(周日)-6(周六)之间的一个整数
        const week = first_date.getDay();
        // 获取当月的总天数
        const daysOfMonth = CustomDatePickerUtils.getDaysOfMonth(year, month);
        // 计算表格所需要行数
        const rows = Math.ceil((daysOfMonth + week) / 7);
        const monthDaysCalendarArray = [];
        // 表格第一行（有星期标志）
        for (let i = 0; i < rows; i++) { // 表格的行
            monthDaysCalendarArray.push([]);
            for (let k = 0; k < 7; k++) { // 表格每行的单元格
                // 单元格自然序列号
                let idx = i * 7 + k;
                // 计算日期
                let dayNumber = idx - week + 1;
                // 过滤无效日期（小于等于零的、大于月总天数的）
                if (dayNumber <= 0 || dayNumber > daysOfMonth) {
                    // 无效日期
                    monthDaysCalendarArray[i].push(null);
                } else {
                    monthDaysCalendarArray[i].push(dayNumber);
                }
            }
        }
        return monthDaysCalendarArray;
    };

}
