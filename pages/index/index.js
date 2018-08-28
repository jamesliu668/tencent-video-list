const util = require('../../utils/utils.js');

var refresh = false; // 是否在刷新
var url = "http://jmsliu.cn/wp-admin/admin-ajax.php";
var page=0;
var nomore=false;
Page({
   data: {
      winWidth: 0,      // 设备屏幕宽
      winHeight: 0,     // 设备屏幕高
      inputShowed:false,
      inputVal:"",
      datalist: [],
      loadmorehidden: false,     // 上拉加载更多 动画
      refreshhidden: false,       // 下拉刷新动画,
     loadingMsg:""
   },
   playVideo: function(e) {
      //url="../player/player?id={{item.id}}&title={{item.title}}&vid={{item.vid}}"
     var that = this;
     var index = e.currentTarget.dataset.index;
     wx.setStorage({
       key: 'video',
       data: that.data.datalist[index]
     })

     wx.navigateTo({
       url: '../player/player'
     })
   },

   onLoad: function (options) {

      var that = this;

      // 获取设备宽高
      wx.getSystemInfo({
         success: function (res) {
            that.setData({
               winWidth: res.windowWidth,
               winHeight: res.windowHeight,
              loadingMsg:"加载数据"
            });
         }
      });
      this.request();
   },

   // 下拉 刷新列表(滚到顶部)
   onPullDownRefresh: function (e) {

      if (!refresh) {
         var that = this;
         refresh = true;

         // 显示刷新动画
         that.setData({
            refreshhidden: false
         })
        page=0;
        nomore=false;
        this.request("refresh");

      } else {
         console.log("正在刷新...");
      }
   },
  refreshHandler:function(){
    refresh = false;
    this.setData({
      refreshhidden: false,
      loadingMsg: "加载更多"
    });
    wx.stopPullDownRefresh();
  },
   // 上拉 加载更多(滚到底部)
   onReachBottom: function (e) {

      var that = this;
      // 没有更多
      if (nomore) {
         that.setData({ // 加载更多 loading
            loadmorehidden: true
         });
      } else {
        // 加载更多 loading
        that.setData({
          loadmorehidden: false,
          loadingMsg: "加载更多"
        })
        this.request();
      }
   },
   onReady: function (e) {
      console.log("onReady 清空缓存！");
      wx.clearStorageSync();
   },
  showInput:function(){
    this.setData({ inputShowed:true});
  },
  hideInput:function(){
    this.setData({inputShowed:false});
  },
  searchInput:function(){
    //搜索
    page=0;
    this.setData({
      loadmorehidden: false,
      loadingMsg: "加载数据",
      datalist:[]
    })
    this.request();
  },
  onInput:function(ev){
    this.setData({inputVal:ev.detail.value});
  },
   request:function(flag){
     // 接口请求
     var that=this;
     wx.request({
       url: url,
      //  method: 'post',
       data: {
         "action": "jms_tencent_video",
         "task": "search",
         "q": that.data.inputVal,
         "start": page * 10
       },
       //  header: { "Content-Type": "application/json" },
       success: function (res) {
        //  wx.clearStorageSync(); // 清空数据
         console.info(res);
         // return;
         //console.info(that.data.list);
         var list = flag=="refresh"?[]:that.data.datalist;
         var resList = JSON.parse(res.data.slice(0, -1));
         if(resList&&resList.length<10){
           nomore=true;
           that.setData({ loadmorehidden:true});
         };
         that.setData({
           datalist: list.concat(resList),
           hidden: true
         });
         page++;
         if(flag=="refresh")that.refreshHandler();
       }
     });
   }
   
})