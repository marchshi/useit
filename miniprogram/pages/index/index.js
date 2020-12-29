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
    collectArray : [],
    swiperHeight : "150px",
    loginCode : ""
  },

  //需要在index界面获取登录信息，如果登录信息没有返回，且用户切换切面，则可能出现bug
  onLoad: function() {

    console.log("index界面的onload函数");
    wx.showLoading({
      title: '正在连接服务器',
      mask: true,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("index界面的onShow函数");
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
      fail: console.error,
      complete:function(){
        wx.hideLoading();
      }
    })
  },
  swiperHeight:function(e){
    console.log(e)
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh=e.detail.height;//图片高度
    var imgw=e.detail.width;//图片宽度
    var swiperH=winWid*imgh/imgw + "px"//等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      swiperHeight:swiperH//设置高度
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
  toChooseArea(){
    wx.navigateTo({
      url: "/pages/chooseArea/chooseArea",
    })
  },
  onShareAppMessage: function () {
    
  },

  testCloudFunction(){
    wx.cloud.callFunction({
      name: 'getBasicDetailsByName',
      data :{
        name :"江苏西格尔汽车内饰件有限公司"
      },
      success: function (res) {
        console.log(res);
        
      },
      fail: console.error
    })
  },
  testWebView(){
    wx.navigateTo({
      url: "/pages/webView/webView",
    })
  },
  onCodeInput(e){
    let value = e.detail.value.trim();
    this.setData({
      loginCode : value,
    })
    console.log(value)
  },
  onCodeLogin(e){
    const _this = this;
    console.log(this);
    wx.cloud.callFunction({
      name: 'codeLogin',
      data:{
        loginCode : (_this.data.loginCode +"").trim()
      },
      success: function (res) {
        console.log(res);
        if (res.result.code=="success"){
          getApp().data.logined = true;
          getApp().data.authInfo = res.result.data;
          _this.setData({
            logined: true,
            authInfo : res.result.data
          })
        }else{
          wx.showToast({
            title: '登录失败，请输入预留的手机号码',
            duration: 2000,
            icon: 'none'
          })
        }
      },
      fail: console.error
    })
  }
})
