// miniprogram/pages/search/search.js
Page({

  data: {
    cmpList:[
      {
        cmpName:"中国石油",
        cmpId:123000
      },
      {
        cmpName:"中国石化",
        cmpId:123001
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1,获取企业名单
    //调用云函数获取页面需要展示的数据
    const _this = this;
    wx.cloud.callFunction({
      name: 'getcmplist',
      success: function (res) {
        console.log(res);
        _this.setData({
          cmpList: res.result.cmpList
        })

      },
      fail: console.error
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  //监听输入的汉字
  onInput: function(e){
    console.log("input输入的是："+e.detail.value);
    //2,监听输入信息，在名单中查询出来
    const value = e.detail.value;
    
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