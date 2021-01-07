// miniprogram/pages/setCompanyUser/setCompanyUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyList:[],
    userList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const db = wx.cloud.database();
    db.collection("company").where({
      areaId : options.areaid +"",
      property : "自有"
    }).get().then(res=>{
      console.log(res)
      this.setData({
        companyList : res.data,
        areaId : options.areaid
      })
    }).catch(e=>console.log(e))
    db.collection("user").where({
      dpmtId : options.dpmtid
    }).get().then(res=>{
      console.log(res)
      this.setData({
        userList : res.data
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindUserChange(e){
    let user = this.data.userList[parseInt(e.detail.value)];
    let companyList = this.data.companyList;
    
    console.log(e);
    console.log(user)
    console.log(companyList)
    let companyindex = e.currentTarget.dataset.companyindex;
    let id = companyList[companyindex]._id;
    companyList[companyindex].userId = user._id;
    companyList[companyindex].userName = user.name;
    let companyInfo = companyList[companyindex];
    const db = wx.cloud.database();
    db.collection("company").where({
      _id : id
    }).update({
      data: {
        userId : companyInfo.userId,
        userName : companyInfo.userName
      }
    }).then(res=>{
      this.setData({
        companyList
      })
    })
    
  }
})