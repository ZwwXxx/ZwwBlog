// 时间戳：1637244864707
/* 时间戳转换为时间 */
export default {
    timestampToTime(value, type = 0) {
        var time = new Date(value);// 2023-07-07 17:07:44
        var year = time.getFullYear();// 2023年
        var month = time.getMonth() + 1; // 0-11 +1表示1-12月
        var date = time.getDate();// 1-31号
        var hour = time.getHours();// 0-23时
        var minute = time.getMinutes();// 0-59分
        var second = time.getSeconds();// 0-59秒
        month = month < 10 ? "0" + month : month;// 如果小于10的月份,前面补0
        date = date < 10 ? "0" + date : date;
        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        var arr = [
            year + "-" + month + "-" + date,
            year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second,
            year + "年" + month + "月" + date,
            year + "年" + month + "月" + date + "日" + " " + hour + ":" + minute + ":" + second,
            hour + ":" + minute + ":" + second
        ]
        return arr[type];
    }
}


