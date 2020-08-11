// miniprogram/pages/editCompany/editCompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id :"",
    companyInfo:[],
    authList:["2","6","9"],
    dpmtList:[],
    pageType:"edit",
    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    rules: [{
      name: 'name',
      rules: {required: true, message: '请填写姓名'},
    }, {
      name: 'wxTel',
      rules: [{required: true, message: '请填写微信绑定的手机号'},{mobile: true, message: '手机号格式不对'}],
    }, {
      name: 'tel',
      rules: [{required: true, message: '请填写微信绑定的手机号'},{mobile: true, message: '手机号格式不对'}],
    }, {
      name: 'dpmt',
      rules: {required: true, message: '请填写部门'},
    }, {
      name: 'auth',
      rules: {required: true, message: '请选择用户权限'},
    }]
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

  }
})