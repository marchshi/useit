// miniprogram/pages/cmpinfo/cmpinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cmpId : null,
    cmpInfo :{

    }
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cmpId = options.cmpId;
    //调用云函数获取页面需要展示的数据
    const _this = this;
    wx.cloud.callFunction({
      name: 'getcmpinfo',
      data:{
        cmpId : options.cmpId
      },
      success: function(res){
        console.log(res);
        _this.setData({
          cmpInfo : res.result.data
        })
        
      },
      fail:console.error
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

  callFarenPhone : function (){
    console.log("111111");
    const tel = this.data.cmpInfo.farenTel +"";
    console.log(tel)
    wx.makePhoneCall({
      phoneNumber: tel,
      success: (result) => {
        console.log("拨打电话成功")
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  callFuzePhone : function (){
    const tel = this.data.cmpInfo.fuzeTel +"";
    console.log(tel)
    wx.makePhoneCall({
      phoneNumber: tel,
      success: (result) => {
        console.log("拨打电话成功")
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  callWanggePhone : function (){
    const tel = this.data.cmpInfo.wanggeTel +"";
    console.log(tel)
    wx.makePhoneCall({
      phoneNumber: tel,
      success: (result) => {
        console.log("拨打电话成功")
      },
      fail: () => {},
      complete: () => {}
    });
      
  },



})