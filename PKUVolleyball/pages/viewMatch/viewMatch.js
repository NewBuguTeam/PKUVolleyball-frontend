// pages/view/viewMatch.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numOfDatesRequesting: 2,
    lastDate: "2020.12.4",
    group: "B",
    nullUrl: "",
    identity: "umpire",
    umpireIdentity: "umpire",
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
        viceUmpireImageUrl:""
      },
      {
        time: "11.00",
        group: "C",
        teamA: "信科",
        teamB: "医学",
        score: "3:1",
        umpireImageUrl:"",
        viceUmpireImageUrl:""
      },
      {
        time: "11.00",
        group: "B",
        teamA: "信科",
        teamB: "医学",
        score: "3:1",
        umpireImageUrl:"",
        viceUmpireImageUrl:""
      }]
    },
    {
      date: "2020.12.4",
      list:[{
          time: "11.00",
          group: "C",
          teamA: "信科",
          teamB: "医学",
          score: "3:1",
          umpireImageUrl:"",
          viceUmpireImageUrl:""
        },
        {
          time: "11.00",
          group: "C",
          teamA: "信科",
          teamB: "医学",
          score: "3:1",
          umpireImageUrl:"",
          viceUmpireImageUrl:""
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
      url: '../matchInfo/matchInfo',
    })
  },

  getMatchList: function(){
    let self = this;
    wx.request({
      url: app.globalData.rootUrl + '/viewMatches',
      data: {
        "numOfDatesRequesting": JSON.stringify(self.data.numOfDatesRequesting),
        "lastDate": JSON.stringify(self.data.lastDate)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      
      success:function(res){
          console.log('request getMatchList returns: ', res.data)
          console.log('request getMatchList returns: ', res.data.alist)
          let oldList = self.data.futureList,
              newList = res.data.matchList;
              
          if (typeof self.data.matchlist !== "undefined")
              oldList = self.data.matchlist
          else
              util.getWeekday(oldList)
     
          util.getWeekday(newList)
          
          let list = oldList.concat(newList);
          
          self.setData({
              matchList: list,
              lastDate: res.data.lastDate
          })
          
          console.log(self.data.matchList)
      },
      fail: function(res) {
          console.log('登陆失败！' + res.errMsg)
      }
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