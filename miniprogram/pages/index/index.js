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

  //首先通过openid看是否绑定过账号，如没有绑定则登录失败，需要输入识别码
  onLoad: function() {
    //获取登录信息，防止用户切换画面出现数据不同步的bug
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
      name: 'getUserAccount',
      success: function (res) {
        console.log(res);
        if (res.result.code=="success"){
          getApp().data.logined = true;
          getApp().data.userInfo = res.result.data.userInfo;
          getApp().data.accountInfo = res.result.data.accountInfo;
          _this.setData({
            logined: true,
            userInfo : res.result.data.userInfo,
            accountInfo: res.result.data.accountInfo
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
  onOldSearchTap: function(){
    wx.navigateTo({
      url: "/pages/search/search"
    })
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
    if(this.data.loginCode.match("^[0-9]{6}$")){
      wx.showLoading({
        title: '正在连接服务器',
        mask: true,
      })
      wx.cloud.callFunction({
        name: 'codeLogin',
        data:{
          loginCode : (_this.data.loginCode +"").trim()
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res);
          if (res.result.code=="success"){
            getApp().data.logined = true;
            getApp().data.userInfo = res.result.data.userInfo;
            getApp().data.accountInfo = res.result.data.accountInfo;
            _this.setData({
              logined: true,
              userInfo : res.result.data.userInfo,
              accountInfo : res.result.data.accountInfo
            })
            wx.showToast({
              title: res.result.data.userInfo.name+",欢迎使用！",
              duration: 2000,
            })
          }else{
            wx.showToast({
              title: res.result.data,
              duration: 2000,
              icon: 'none'
            })
          }
        },
        fail: ()=>{
          wx.hideLoading(); 
          console.error
        }
      })
    }else{
      wx.showToast({
        title: '请输入六位数字识别码！',
        icon : "none",
      })
    }
  }
})
