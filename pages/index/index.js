//index.js
//获取应用实例
const app = getApp()

const server = require("../../utils/server.js");

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    display: '',
    baseline: '',
    panadaGif: app.CDN_URL + "/panda1.gif?t=2",
    sharePng: app.CDN_URL + "/shareimg.png",
    csdPng: app.CDN_URL + "/csdimg.png",
    sigepng: app.CDN_URL + "/sige.jpg",
    sjpng: app.CDN_URL + "/sjimg.png",
    todrawpng: app.CDN_URL + "todraw.jpg",
    showsjpng: app.CDN_URL + "/sigesj.png",
    shuijing: Number(0),
    drawpath:'pages/index/index',
    sigeplay: "none",
    showGameModule:false,
    extra: {
      "openid": '', 
    },
  },

  showview: function() {
    this.setData({
      display: "block"
    })
  },
  hideview: function() {
    this.setData({
      display: "none"
    })
  },
  hidesige:function(){
    this.setData({
      sigeplay:'none'
    })
  },
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var curV = res.SDKVersion;

        function compareVersion(v1, v2) {
          v1 = v1.split('.')
          v2 = v2.split('.')
          var len = Math.max(v1.length, v2.length)

          while (v1.length < len) {
            v1.push('0')
          }
          while (v2.length < len) {
            v2.push('0')
          }

          for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i])
            var num2 = parseInt(v2[i])

            if (num1 > num2) {
              return 1
            } else if (num1 < num2) {
              return 0
            }
          }

          return 1
        };
        var bool = compareVersion(curV, '2.0.7');
        that.setData({
          caniuse: bool
        })
      },
    })

    server.getBox(res => {

      var apps = res.data.apps;
      for (var s = 0; s < apps.length; s++) {
        apps[s].clsUrl = app.CDN_URL + apps[s].clsUrl;

      }
      for (var i = 0; i < apps.length; i++) {
        for (var j = 0; j < apps[i].apps.length; j++) {
          var imgUrl = app.CDN_URL + apps[i].apps[j].imgUrl;
          apps[i].apps[j].imgUrl = imgUrl;
        }
      }
      this.setData({
        apps: apps
      });
      var banner = res.data.banner;

      if (banner) {
        for (var i = 0; i < banner.length; i++) {
          var imgUrl = app.CDN_URL + banner[i].imgUrl;
          banner[i].imgUrl = imgUrl;
        }
        this.setData({
          banner: banner
        });
      }
      this.setData({
        baseline: '你触碰到我的底线了~'
      })

    });

    if (options && options.target) {
      setTimeout(function() {
        wx.navigateToMiniProgram({
          appId: options.target,
          path: options.path
        })
      }, 500)
    }


  },


  onHide: function () {
    this.setData({
      popuphidden:false,
    })
  },


  onShow: function(){
    //展示水晶
    app.getUserInfo(res => {
      server.getCryCount(res => {
        var pandaflag=res.data.data.flag;
        if(pandaflag == 1){
          this.setData({
            sigeplay: 'block'
          })
          setTimeout( ()=>{
            this.setData({
              sigeplay: 'none'
            })
          }, 2000)
        }
      });
      server.checkUserLastDay(res => {
        var flag=res.data.data;
        if (flag){
          wx.showTabBarRedDot({
            index: 1
          })
        }
      });
      server.getPandaRecordIfComplete(res => {})
    })
  },
  gemePv:function(e){
    server.gemePv(e,res =>{})
    server.updPandaRecordPlayGame(e.currentTarget.dataset.appid);
  },

  shareview: function(e) {
    wx.request({
      method: "POST",
      url: app.HTTP_SERVER + 'bm/rest/appGameShareRecord.htm',
      data: {
        gameId: 'wxf9a87f517db88e2a'
      },
      header: {
        'content-type': 'application/json', // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideLoading();
      }
    });
  },
  //事件处理函数
  toapp: function(e) {
    var appId = e.currentTarget.dataset.d;
    var path = e.currentTarget.dataset.p;
    if (!path) {
      path = "pages/index/index";
    }
    wx.navigateToMiniProgram({
      appId: appId,
      path: path
    })
  },

  //长按显示游戏分享弹窗
  showShareGameModule: function (e) {   
    this.setData({
      popuphidden: true,
      gameAvatar:e.currentTarget.dataset.avatar,
      gameTitle: e.currentTarget.dataset.apptitle,
      gameDesc: e.currentTarget.dataset.desc
    })

   
  },
  onShareAppMessage: function() {
    return {
      title: '天天玩熊猫是一种什么生活？',
      path: '/pages/index/index',
      imageUrl: app.CDN_URL + "/miniimg.jpg"
    }
  },
  //广告页面
  topromotion: function() {
    wx.navigateTo({
      url: '/pages/promotion/promotion',
    });
    this.setData({
      showCollect: false
    });
    app.setLocalStorage("showCollect", true);
  },
  //去抽奖统计点击次数
  godraw: function() {
    server.godraw({})
  },
  //关闭
  doclose: function() {
    this.setData({
      showCollect: false
    });
    app.setLocalStorage("showCollect", true);
  },



  clickMask: function () {
    this.setData({
      popuphidden: false
    })
  },




})