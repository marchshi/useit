//index.js
const app = getApp()

Page({
  data: {
    background : ['banner1.jpg','banner2.jpg','banner3.jpg'],
    indicatorDots : true,
    autoplay : true,
    interval : 4000,
    duration : 1000,
    logined : false,
    authInfo : [],
    collectList : [],
    collectArray : []
  },

  onLoad: function() {

    console.log(app);

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
          getApp().data.logined = true;
          getApp().data.authInfo = res.result.data.authInfo;
          getApp().data.collectList = res.result.data.userInfo.collectList;
          _this.setData({
            logined: true,
            authInfo : res.result.data.authInfo,
            collectObj: res.result.data.userInfo.collectList,
            collectArray: res.result.data.collectArray
          })
        }

      },
      fail: console.error
    })
  },

  onSearchTap: function(){
    if (this.data.logined){
      wx.navigateTo({
        url: "/pages/search/search"
      })
    }else{
      wx.showToast({
        title: '请先登录，在下方我的中输入手机号进行验证',
        duration: 2000,
        icon: 'none'
      })
    }
    
  },
})
