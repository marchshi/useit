//app.js
App({
  data :{
    logined : false,
    userInfo : {},
    accountInfo : {},
    collectList : [],
    cmpList : []
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        //初始化云开发环境   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    let that = this
    // 在这里用定时器模拟网络请求的过程
    setTimeout(function () {
      that.globalData.name = '我是谁'
    }, 6000) 
  },

  watch: function (method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "name", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._name = value;
        console.log('是否会被执行2')
        method(value);
      },
      get: function () {
        return this._name
      }
    })
  },
  globalData : {
    _name : '你是谁'
  }
})
