//index.js
const app = getApp()

Page({
  data: {
    background : ['banner1.jpg','banner2.jpg','banner3.jpg'],
    indicatorDots : true,
    autoplay : true,
    interval : 4000,
    duration : 1000,
    collectList:[
      {
        cmpName:"中国石油",
        cmpId:"010101"
      },
      {
        cmpName:"中国石化",
        cmpId:"010201"
      },
      {
        cmpName:"国家电网",
        cmpId:"020101"
      }
    ],
    logined : false,
    authInfo : [],
    collectList : []
  },

  onLoad: function() {

    console.log(app);

    wx.getUserInfo({
      success: (result) => {
        console.log(result)  
      }
    });
    
    //login连接云端环境
    wx.login({
      success: (result) => {
        console.log(result)
      },
      fail: () => {},
      complete: () => {}
    });

    //1,获取登录状态
    //调用云函数获取当前账号是否登录
    const _this = this;
    wx.cloud.callFunction({
      name: 'getuserinfo',
      success: function (res) {
        console.log(res);
        if (res.result.code=="success"){
          _this.setData({
            logined: true,
            authInfo : res.result.data.authInfo,
            collectList : res.result.data.userInfo.collectList
          })
        }

      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    //1,获取登录状态
    //调用云函数获取当前账号是否登录
    const _this = this;
    wx.cloud.callFunction({
      name: 'getuserinfo',
      success: function (res) {
        console.log(res);
        if (res.result.code=="success"){
          _this.setData({
            logined: true,
            authInfo : res.result.data.authInfo,
            collectList : res.result.data.userInfo.collectList
          })
        }

      },
      fail: console.error
    })
  },
})
