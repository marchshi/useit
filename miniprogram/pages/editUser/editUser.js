// miniprogram/pages/editUser/editUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id :"",
    userinfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id : options.id
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
    db.collection('user').where({
      id : this.data.id
    }).get().then(res=>{
      this.setData({
        userinfo: res.data[0]
      })
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onSave(e){
    console.log(e.detail.value);
    let userinfo = e.detail.value;
    const db = wx.cloud.database();
    db.collection("user").where({
      id : userinfo.id
    }).update({
      data :userinfo
    }).then(e=>console.log(e))
  }
})