// miniprogram/pages/myBlockInfo/myBlockInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blockId : "",
    areaId: "",
    companyList :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      areaId : options.areaid,
      blockId : options.blockid
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
    const db = wx.cloud.database();
    db.collection("company1").where({
      blockId : this.data.blockId
    }).get().then(res=>{
      console.log(res)
      this.setData({
        companyList : res.data
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toAddCompany(){
    let blockId = this.data.blockId;
    let areaId = this.data.areaId;
    wx.navigateTo({
      url: '/pages/addCompany/addCompany?areaid=' + areaId +'&blockid=' + blockId,
    })
  }
})