// pages/player/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video:{
      description: "其实我还是希望美队痛扁那小子的。",
      id: "12",
      thumb: "http://jmsliu.cn/wp-content/plugins/jms-tencent-video-manager/controllers/../thumb/YZUAF9ImVlwCAehsZDwCMHYWID4XggJj",
      title: "蜘蛛侠PK美国队长，你更喜欢哪一个？终于有人敢攻击美国队长的腿了！",
      update_date: "2018-08-20 17:34:27",
      vid: "n06994oo8uo"
    },
    imageList: ['http://jmsliu.cn/wp-content/uploads/2018/08/pay.jpeg']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(options.id);
    // console.log(options.title);
    // console.log(options.vid);
    // that.setData({videos:{
    //   videoid: options.id,
    //   title: options.title,
    //   vid: options.vid
    // }})

    wx.getStorage({
      key: 'video',
      success: function(res) {
        that.setData({video:res.data})
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  scanQRCode: function(e) {
    // var current = e.target.dataset.src;
    wx.previewImage({
      // current:current,
      urls: this.data.imageList // 需要预览的图片http链接列表
    })
  }
})