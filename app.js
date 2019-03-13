//app.js
App({

  //缓存
  CACHE_PREFIX: "XiongMao_",
  APP_ID: "wxf9a87f517db88e2a",
  CDN_URL: "https://zuji.weixinpy.com/kidsGameBox/",
  // HTTP_SERVER: "http://192.168.2.196:8080/xgApp/",
  //xgAPP请求地址
  HTTP_SERVER: "https://wxapp.xiguazuji.com/",
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  // 登录
  //获取用户信息
  getUserInfo: function (cb) {
    //已经登录，获取用户基本信息
    if (this.globalData.openid) {
      cb(this.globalData.userInfo);
    } else {
      // 登录，获取用户openid
      wx.login({
        success: res => {
          //从开发服务器获取openid
          var code = res.code;
          wx.request({
            url: this.HTTP_SERVER+'panda/JSession/jscode2session.htm',
            method: "POST",
            data: {
              jscode: code
            },
            header: {
              'appid': this.APP_ID,
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: res => {
              //回调
              if (typeof cb === "function") {
                this.globalData.userInfo = {};
                this.prepareGlobalData(res.data);

                cb(this.globalData.userInfo);
              }
            },
            fail: function (res) {
              console.log("jscode2session fail");
            },
            //完成一定会执行
            complete: res => {

            }
          });
        }
      });
    }
  },
  //根据授权获取用户信息
  getScopeUserInfo: function (cb) {
    var openid = this.globalData.userInfo.openid;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              userInfo.openid = openid;
              //已经授权
              cb(userInfo);
            }
          });
        } else {
          cb(null);
        }
      }
    })
  },
  //全局数据
  prepareGlobalData: function (resData) {
    var userInfo = resData.data;
    this.globalData.openid = userInfo.openid; //判断用户是否登录
    this.globalData.sessionkey = resData.sessionkey;
    this.globalData.userInfo = userInfo; //用户信息
  },
  globalData: {
    userInfo: {}
  },
  //成语的缓存 getter & setter
  getLocalStorage: function (key) {
    key = this.CACHE_PREFIX + key;
    return wx.getStorageSync(key);
  },

  //设置缓存
  setLocalStorage: function (key, value) {
    key = this.CACHE_PREFIX + key;
    wx.setStorageSync(key, value);
  },
})