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
    const db = wx.cloud.database();
    db.collection("company").where({
      _id : options.id
    }).get().then(res=>{
      console.log(res)
      let companyInfo = res.data[0];
      this.setData({
        companyInfo : companyInfo
      })
      //获取网格员的相关信息
      db.collection("user").where({
        _id : companyInfo.userId
      }).get().then(res1=>{
        console.log(res1)
        let tel = res1.data[0].tel;
        let name = res1.data[0].name;
        this.setData({
          ['companyInfo.userTel'] : tel
        })
      })
      //获取内部租赁企业的相关信息
      db.collection("company").where({
        ownCompanyId : companyInfo._id
      }).get().then(res2=>{
        console.log(res2)
        let leaseCompanyList = res2.data;
        this.setData({
          ['companyInfo.leaseCompanyList'] : leaseCompanyList
        })
      })
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