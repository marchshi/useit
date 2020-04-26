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
    logined : true
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
