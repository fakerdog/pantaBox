
const app = getApp();

function gemePv(e,cb) {
  var id = e.currentTarget.dataset.aid;
  var gameappId = e.currentTarget.dataset.appid;
  wx.request({
    method: "POST",
    url: app.HTTP_SERVER + 'bm/rest/appGameRecord.htm',
    data: {
      gameId: 'wxf9a87f517db88e2a',
      id: id,
      gameappId: gameappId
    },
    header: {
      'content-type': 'application/json', // 默认值
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      console.log(res);
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}

//获取用户基本信息（水晶）
function getCryCount(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'bm/rest/getCryCount.htm',
    method: "POST",
    data: {},
    header: {
      'appid': app.APP_ID,
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);

      }
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}
//判断用户最后登录时间是否超过15分钟
function checkUserLastDay(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'bm/rest/checkUserLastDay.htm',
    method: "POST",
    data: {},
    header: {
      'appid': app.APP_ID,
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);

      }
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

//用户任务进度数据
function getPandaRecordIfComplete(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'bm/rest/getPandaRecordIfComplete.htm',
    method: "POST",
    data: {},
    header: {
      'appid': app.APP_ID,
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);

      }
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

//更新用户玩游戏进度
function updPandaRecordPlayGame(appid) {
  wx.request({
    url: app.HTTP_SERVER + 'bm/rest/updPandaRecordPlayGame.htm',
    method: "POST",
    data: {
      appid:appid
    },
    header: {
      'appid': app.APP_ID,
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);

      }
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}
//更新用户分享游戏进度 
function updPandaRecordShareGame(appid,cb) {
  wx.request({
    url: app.HTTP_SERVER + 'bm/rest/updPandaRecordShareGame.htm',
    method: "POST",
    data: {
      appid: appid
    },
    header: {
      'appid': app.APP_ID,
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);

      }
    },
    fail: function (res) {
    }
  });
}

//统计点击次数
function godraw() {
  wx.request({
    url: app.HTTP_SERVER + 'app/commonrest/submitStatis.htm',
    method: "POST",
    data: {
      appname:'转盘抽个奖',
      appid:'wxa8d04da78e0b0fdb',
      sharetype:3001,
      fromappid: 'wxf9a87f517db88e2a'
    },
    header: {
      'appid': app.APP_ID,
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {

      }
    },
    fail: function (res) {
    }
  });
}
function getBox(cb) {
  wx.showLoading({
    title: '数据加载中...',
  });

  var flag = false;
  wx.request({
    url: app.CDN_URL +'xmboxjson-v1.json',
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) {
    },
    complete: function (res) {
      wx.hideLoading();
    }
    
  });
}
//获取banner
function getLuckyDrawBanner(cb) {
  wx.showLoading({
    title: '数据加载中...',
  });
  var flag = false;
  wx.request({
    url: 'https://zuji.weixinpy.com/luckyDraw/luckydrawbannerjson-v1.json',
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}

module.exports = {
  getBox: getBox,
  getCryCount: getCryCount,
  godraw: godraw,
  checkUserLastDay: checkUserLastDay,
  getPandaRecordIfComplete: getPandaRecordIfComplete,
  getLuckyDrawBanner: getLuckyDrawBanner,
  gemePv: gemePv,
  updPandaRecordPlayGame: updPandaRecordPlayGame,
  updPandaRecordShareGame: updPandaRecordShareGame
}
