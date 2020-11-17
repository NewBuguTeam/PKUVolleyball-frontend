// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['北京市', '北京市', '海淀区'],
    locationId:101030100,
    now:''
  },

  changeRegion: function(e){
    this.setData({
      region: e.detail.value
    })
    this.getWeather();
  },

  getLocationId: function(){
    var that = this;
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?',
      data:{
        location:that.data.region[2],
        adm:that.data.region[0],
        key:'010590a8592b450b8bc591c16c68d03c'
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          locationId : res.data.location[0].id
        })
      }
    })
  },

  getWeather: function(){
    // let 局部， var 全局，this 不能直接在api函数内部使用
    var that = this;
    this.getLocationId();
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now?',
      data:{
        location:that.data.locationId,
        key:'010590a8592b450b8bc591c16c68d03c'
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          now:res.data.now
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
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