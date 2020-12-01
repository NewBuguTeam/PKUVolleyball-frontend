// pages/view/viewMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pastMatchList: [{
      date: "2020.12.1",
      list:[{
        time: "11.00",
        group: "B",
        teamA: "信科",
        teamB: "医学",
        score: "3:1"
      },
      {
        time: "11.00",
        group: "B",
        teamA: "信科",
        teamB: "医学",
        score: "3:1"
      }]
    },
    {
      date: "2020.12.2",
      list:[{
          time: "11.00",
          group: "B",
          teamA: "信科",
          teamB: "医学",
          score: "3:1"
        },
        {
          time: "11.00",
          group: "B",
          teamA: "信科",
          teamB: "医学",
          score: "3:1"
        }]
    }
  ],
  futureMatchList: [{
    date: "2020.12.3",
    list:[{
        time: "11.00",
        group: "B",
        teamA: "信科",
        teamB: "医学",
        score: "3:1",
        umpireImageUrl:"../../images/wechatImage.jpg",
        viceUmpireImageUrl:"../../images/addButton.jpg"
      },
      {
        time: "11.00",
        group: "B",
        teamA: "信科",
        teamB: "医学",
        score: "3:1",
        umpireImageUrl:"../../images/addButton.jpg",
        viceUmpireImageUrl:"../../images/addButton.jpg"
      }]
    },
    {
      date: "2020.12.4",
      list:[{
          time: "11.00",
          group: "B",
          teamA: "信科",
          teamB: "医学",
          score: "3:1",
          umpireImageUrl:"../../images/forbidAddButton.jpg",
          viceUmpireImageUrl:"../../images/forbidAddButton.jpg"
        },
        {
          time: "11.00",
          group: "B",
          teamA: "信科",
          teamB: "医学",
          score: "3:1",
          umpireImageUrl:"../../images/addButton.jpg",
          viceUmpireImageUrl:"../../images/addButton.jpg"
        }]
    }
  ],
    identity: "visitor"
  },

  ClickForMatchDetail: function(e){
    var that = this
    var index = e.currentTarget.id
    var query = JSON.stringify(that.data.pastMatchList[index])
    wx.navigateTo({
      url: '../matchInfo/matchInfo?quey=' + query,
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