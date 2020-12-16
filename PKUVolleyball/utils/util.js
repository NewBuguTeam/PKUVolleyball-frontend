const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return { year: year, month: month, day: day}
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var redis= "redis" 
/**
 * 设置
 * k 键key
 * v 值value
 * t 秒
 */
function put(k, v, t) {
  wx.setStorageSync(k, v)
  var seconds = parseInt(t)
  if (seconds > 0) {
    var newtime = Date.parse(new Date())
    newtime = newtime / 1000 + seconds;
    wx.setStorageSync(k + redis, newtime + "")
  } else {
    wx.removeStorageSync(k + redis)
  }
}
/**
 * 获取
 * k 键key
 */
function get(k) {
  var deadtime = parseInt(wx.getStorageSync(k + redis))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      wx.removeStorageSync(k);
      console.log("过期了")
      return null
    }
  }
  var res=wx.getStorageSync(k)
  if(res){
    return res
  }else{
    return null
  }
}
 
/**
 * 删除
 */
function remove(k) {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + redis);
}
 
/**
 * 清除所有key
 */
function clear() {
  wx.clearStorageSync();
}

var app = getApp()

function cookieDue(){
  app.globaldata.identity = "visitor"
  console.log("cookie过期")
  wx.showToast({
    title: 'cookie过期！请重新登录',
    icon: 'none',
    duration: 1500
  })
}

function showMassage(s){
  wx.showToast({
    title: s,
    icon: 'none',
    duration: 1500
  })
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  putStorage: put,
  getStorage: get,
  removeStorage: remove,
  clearStorage: clear,
  cookieDue: cookieDue,
  showMassage: showMassage
}
