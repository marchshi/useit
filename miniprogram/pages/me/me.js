// miniprogram/pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: 'images/user-unlogin.png',
    userInfo: {},
    logged: false,
    inputText :""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
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
  }

})