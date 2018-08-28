module.exports = {
   getFormatDate: function (str) {

      // 拆分日期为年 月 日
      var YEAR = str.substring(0, 4),
         MONTH = str.substring(4, 6),
         DATE = str.slice(-2);

      // 拼接为 2016/10/02 可用于请求日期格式
      var dateDay = YEAR + "/" + MONTH + "/" + DATE;

      // 获取星期几
      var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
         day = new Date(dateDay).getDay();


      return {
         "dateDay": MONTH + "月" + DATE + "日 " + week[day]
      }

   },

}
