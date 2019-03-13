// pages/crystal/crystal.js

const server = require("../../utils/server.js");
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    csdPng: app.CDN_URL + "/csdimg.png",
    shuijing:0,
    interval: 3000,
    duration: 1000,
    drawpath: 'pages/index/index',
    tipsModule:false,
    notDone:true,
    notplayDone:true,
    notsharegameDone:true,
    showReddos:true,
    playcount:0,//玩两款小游戏进度
    sharecount:0//分享两款小游戏进度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
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
    wx.hideTabBarRedDot({
      index:1,
    })
 

    server.getCryCount(res => {
      this.setData({
        shuijing: res.data.data.pandaUser.crystalcount,
        openid: res.data.data.pandaUser.openid
      })
      var drawsj = this.data.shuijing;
      if (drawsj > Number(0)) {
        this.setData({
          drawpath: 'pages/index/index?openid=' + res.data.data.pandaUser.openid
        })
      } else {
        this.setData({
          drawpath: 'pages/index/index'
        })
      }
      server.checkUserLastDay(res => {
        var flag = res.data.data;
        if (!flag) {
          this.setData({
            showReddos: false
          })
        }
      });
      server.getPandaRecordIfComplete(res => {
        this.setData({
          notDone:res.data.data.sharegroup,
          playcount:res.data.data.playcount,
          notplayDone:res.data.data.playgame,
          sharecount:res.data.data.sharecount,
          notsharegameDone:res.data.data.sharegame
        })
      })
    })

    //获取banner信息
    server.getLuckyDrawBanner(res => {
      var banner = res.data.banner;
      if (banner) {
        for (var i = 0; i < banner.length; i++) {
          var imgUrl = "https://zuji.weixinpy.com/luckyDraw/" + banner[i].imgUrl;
          banner[i].imgUrl = imgUrl;
        }
       
        this.setData({
          banner: banner
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  this.setData({
    tipsModule:false
  })
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





  //去抽奖统计点击次数
  godraw: function () {
    server.godraw({})
  },


  showTips:function(){
    var tipsModule = this.data.tipsModule;
    this.setData({
      tipsModule: !tipsModule
    })
  },

  hideTips:function(){
    this.setData({
      tipsModule:false
    })
  },




  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{ 
        title: '天天玩熊猫是一种什么生活？',
        path: '/pages/index/index',
        imageUrl: app.CDN_URL + "/miniimg.png",
        success:res=>{
        if (res && res.shareTickets && res.shareTickets.length > 0){
          var shuijing=this.data.shuijing;
          console.log(shuijing+20);
          wx.showToast({
            icon:"success",
            title: '+20水晶',
          })
          this.setData({
            notDone:false,
            shuijing:shuijing+20
          })
        }else{
          wx.showToast({
            title: '请分享至群',
            duration:2000,
          })
        }
      }
    };

  }
})