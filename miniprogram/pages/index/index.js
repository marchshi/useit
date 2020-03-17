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
      

    wx.cloud.callFunction({
      name: 'test001',
      data:{
        a: 1,
        b: 2,
      },
      success: function(res){
        console.log(res)
      },
      fail:console.error
    })

  },

})
