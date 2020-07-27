// miniprogram/pages/userList/userList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList :{}
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
    //获取用户列表
    // wx.cloud.callFunction({
    //   name: 'getuserinfo',
    //   success: function (res) {
    //     console.log(res);
    //     if (res.result.code == "success") {
    //       getApp().data.logined = true;
    //       getApp().data.authInfo = res.result.data.authInfo;
    //       getApp().data.collectList = res.result.data.userInfo.collectList;
    //       _this.setData({
    //         logined: true,
    //         authInfo: res.result.data.authInfo,
    //         collectObj: res.result.data.userInfo.collectList,
    //         collectArray: res.result.data.collectArray
    //       })
    //     }
    //   },
    //   fail: console.error,
    //   complete: function () {
    //     wx.hideLoading();
    //   }
    // })
    //1、获取数据库引用

    const db = wx.cloud.database();
    // db.collection("user").orderBy("id","asc").skip(10).get({
    //   success :function(res){
    //     console.log(res)
    //   }
    // });
    const that = this;
    new Promise((resolve, reject) => {
      db.collection("user").count().then(res => resolve(res.total)).catch(e => reject("获取总数失败"));
    }).then(total=>{
      let userList = [];
      console.log(total)
      for (let i = 0; i < total; i += 20) {
        new Promise((resolve, reject) => {
          db.collection("user").orderBy("id", "asc").skip(i).limit(20).get().then(res=>resolve(res.data)).catch(e=>reject("查询列表失败"))
        }).then(res=>{
          userList = userList.concat(res);
          if (userList.length == total){
            console.log("获取数据成功")
            that.setData({
              userList: userList
            })
          }
        })
      }
    }).catch(res=>console.log(res+"1111"))

    // this.getUserTotal();

    // let total = 0;
    // db.collection("user").count().then(res => console.log(res.total));
    // let userList = [];
    // for(let i = 1 ; i<total+1 ; i+=20){
    //   db.collection("user").orderBy("id", "asc").skip(i).limit(20).get({
    //     success:function(res){
    //       userList.concat(res.data)
    //     }
    //   })
    // }
    // console.log(userList)
  },
  getUserTotal(){
    const db = wx.cloud.database();
    return new Promise((resolve, reject) => {
      db.collection("user").count().then(res => resolve(res.total)).catch(e=>reject("获取总数失败"));
    });
    // db.collection("user").count().then(res=> console.log(res))
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