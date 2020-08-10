// miniprogram/pages/addCompany/addCompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyInfo:{
      
    },
    ownClass:[
      { class : "101",className : "工业企业"},
      { class : "102",className : "非工业企业"}
    ],
    leaseClass:[
      { class : "201",className : "工业企业"},
      { class : "202",className : "商贸办公"},
      { class : "203",className : "个体户"},
      { class : "204",className : "仓库物流快递"},
      { class : "205",className : "施工队"},
      { class : "206",className : "未工商注册"},
    ],
    property :["自有","租赁"]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      ['companyInfo.blockId'] : options.blockid+""
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  toChooseCompany(){
    const that = this;
    wx.navigateTo({
      url: '/pages/chooseCompany/chooseCompany',
      events :{
        getCompanyNameStdCode : function(res){
          console.log(res)
          console.log(that)
          that.setData({
            isChoose :true,
            ['companyInfo.name'] :res.data.name,
            ['companyInfo.stdCode'] :res.data.stdCode,
          })
        }
      }
    })
  },

  bindPropertytChange(e){
    console.log(e)
    if(e.detail.value=="0"){
      this.setData({
        ['companyInfo.property'] : "自有"
      })
    }else if (e.detail.value=="1"){
      this.setData({
        ['companyInfo.property'] : "租赁"
      })
    }
  },
  bindClassChange(e){
    console.log(e)
    this.setData({
      ["companyInfo.class"] : this.data.ownClass[parseInt(e.detail.value)].class,
      ["companyInfo.className"] : this.data.ownClass[parseInt(e.detail.value)].className
    })
  },
  bindOwnChange(e){
    console.log(e)
    
  },
  onSubmit(){
    console.log(this.data.companyInfo)
    let companyInfo = this.data.companyInfo;
    companyInfo.time = new Date().getTime();
    console.log(companyInfo)
    const db = wx.cloud.database();
    db.collection("company1").add({
      data: this.data.companyInfo
    }).then(res=>{
      console.log(res)
      wx.showToast({
        title: '添加成功',
        duration: 1000
      })
    })
  }
})