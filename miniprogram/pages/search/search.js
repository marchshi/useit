// miniprogram/pages/search/search.js
Page({

  data: {
    dataList:[
      {
        cmpName:"中国石油",
        cmpId:123000
      },
      {
        cmpName:"中国石化",
        cmpId:123001
      },
      {
        cmpName:"国家电网",
        cmpId:960000
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  //监听输入的汉字
  onInput: function(e){
    console.log("input输入的是："+e.detail.value);
    //1,获取企业名单
    
    //2,监听输入信息，在名单中查询出来

    //3,展示查询出的企业名单

  },

  //跳转进入详情页面
  toCmpInfo: function(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/cmpinfo/cmpinfo?cmpId=010101',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  }
})