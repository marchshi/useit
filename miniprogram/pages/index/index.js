//index.js
const app = getApp()

Page({
  data: {
    // background : ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    background : ['banner1.jpg','banner2.jpg','banner3.jpg'],
    indicatorDots : true,
    autoplay : true,
    interval : 4000,
    duration : 1000,
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
