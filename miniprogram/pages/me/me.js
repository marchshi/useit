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
    test1:"测试数据",
    loginCode : ""
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
    console.log("onshow")
    console.log(getApp().data)
    if (getApp().data.logined){
      this.setData({
        logined : true,
        userInfo : getApp().data.userInfo
      })
    }
  },

  onInput(e){
    let value = e.detail.value.trim();
    this.setData({
      inputText : value,
    })
  },
  //点击跳转页面
  toMyCmp(){
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
  toTestWeui(){
    wx.navigateTo({
      url: "/pages/testWeui/testWeui",
    })
  },
  onShareAppMessage: function () {

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