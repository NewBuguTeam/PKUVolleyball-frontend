// pages/confirmPoints/confirmPoints.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameA: "信科",
    nameB: "医学",
    curRound: 1,
    curPointA: 0,
    curPointB: 0
  },

  teamAScore:function(e){
    this.setData({
      curPointA: this.data.curPointA + 1
    })
  },

  teamBScore:function(e){
    this.setData({
      curPointB: this.data.curPointB + 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})