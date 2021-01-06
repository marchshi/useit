// miniprogram/pages/setBlockUser/setBlockUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blockList:[],
    userList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const db = wx.cloud.database();
    db.collection("block").where({
      areaId : options.areaid +""
    }).get().then(res=>{
      console.log(res)
      this.setData({
        blockList : res.data,
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
    let blockList = this.data.blockList;
    
    console.log(e);
    console.log(user)
    console.log(blockList)
    let blockIndex = e.currentTarget.dataset.blockindex;
    let id = blockList[blockIndex].id;
    blockList[blockIndex].userId = user._id;
    blockList[blockIndex].userName = user.name;
    let blockInfo = blockList[blockIndex];
    const db = wx.cloud.database();
    db.collection("block").where({
      id
    }).update({
      data: {
        userId : blockInfo.userId,
        userName : blockInfo.userName
      }
    }).then(res=>{
      this.setData({
        blockList
      })
    })
    
  }
})