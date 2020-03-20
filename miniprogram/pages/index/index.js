//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function() {

    wx.getUserInfo({
      
      success: (result) => {
        console.log(result)  
      }
    });
    
    //登陆，获取收藏的企业
    wx.login({
      success: (result) => {
        console.log(result)
      },
      fail: () => {},
      complete: () => {}
    });
  },

})
