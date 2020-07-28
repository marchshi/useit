// miniprogram/pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: 'images/user-unlogin.png',
    userInfo: {},
    logged: false,
    inputText :"",
    logined : false,
    authInfo : {

    },
    test1:"测试数据"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    getApp().watch(that.watchBack)
  },
  watchBack: function (name) {
    console.log(22222);
    console.log('this.name==' + name);
    this.setData({
      test1:"修改测试数据"
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
    if (getApp().data.logined){
      this.setData({
        logined : true,
        authInfo : getApp().data.authInfo
      })
    }
    
  },

  /**
   * 
   */
  getPhoneNumber: function (e) {

    console.log(e.detail);
    //1、首先获取openid,通过openid在后台获取手机号然后判断有无权限
    //2、如果openid没有绑定手机号，则获取手机号来进行绑定。
    //3、获取手机号成功后，则将手机号发送至后台验证，同时绑定手机号与opneid
    //4、验证成功则获取相关权限
  },

  onInput(e){
    let value = e.detail.value.trim();
    this.setData({
      inputText : value,
    })
  },
  onTelLogin(){
    //调用云函数获取当前账号是否登录
    const _this = this;
    console.log(this);
    wx.cloud.callFunction({
      name: 'telLogin',
      data:{
        tel : _this.data.inputText +""
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
  },
  //点击跳转页面
  toMyCmp(){
    console.log("111111")
    wx.navigateTo({
      url: "/pages/mycmp/mycmp",
    })
  },
  
  //点击跳转人员管理页面
  toUserList() {
    wx.navigateTo({
      url: "/pages/userList/userList",
    })
  },
  toAreaList(){
    wx.navigateTo({
      url: "/pages/areaList/areaList",
    })
  },
  onShareAppMessage: function () {

  }

})