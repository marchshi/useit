// miniprogram/pages/editArea/editArea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areainfo:{},
    dpmtList:{},
    userList :{},
    totalRequest : 3,
    finishRequest : 0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      finishRequest : 0
    })
    wx.showLoading({
      title: '正在加载中',
    })
    console.log(options.id);
    const db = wx.cloud.database();
    db.collection("area").where({
      id : options.id
    }).field({
      _id : false
    }).get().then(res=>{
      console.log(res)
      if(this.data.finishRequest + 1 == this.data.totalRequest){
        wx.hideLoading()
      }
      this.setData({
        areainfo : res.data[0],
        finishRequest : this.data.finishRequest + 1
      })
    })

    db.collection("dpmt").where({all : null}).field({
      _id : false
    }).get().then(res=>{
      if(this.data.finishRequest + 1 == this.data.totalRequest){
        wx.hideLoading()
      }
      this.setData({
        dpmtList : res.data,
        finishRequest : this.data.finishRequest + 1
      })
    })
    db.collection("user").where({
      auth :"6"
    }).orderBy("dpmtId","asc").field({
      _id : true,
      name : true
    }).get().then(res=>{
      console.log(res)
      if(this.data.finishRequest + 1 == this.data.totalRequest){
        wx.hideLoading()
      }
      this.setData({
        userList : res.data,
        finishRequest : this.data.finishRequest + 1
      })
    })
    // db.collection("user").where({all : null}).field({
    //   _id : false,
    //   id : true,
    //   name : true,
    //   dpmt : true,
    //   dpmtId : true
    // }).get().then(res=>{
    //   let userList = res.data;
    //   let firstLine = [];
    //   let userArray = {};
    //   let multiArray = [];
    //   for(let item of userList){
    //     if(firstLine.indexOf(item.dpmt) == -1){
    //       firstLine.push(item.dpmt);
    //       userArray[item.dpmt] = [];
    //     }
    //     userArray[item.dpmt].push(item)
    //   }
    //   multiArray.push(firstLine);
    //   multiArray.push(userArray[0]);
    //   if(this.data.finishRequest + 1 == this.data.totalRequest){
    //     wx.hideLoading()
    //   }
    //   this.setData({
    //     multiArray : multiArray,
    //     finishRequest : this.data.finishRequest + 1
    //   })
    // })
/*     <picker mode="multiSelector" bindchange="bindMultiPickerChange" bindcolumnchange="bindMultiPickerColumnChange" value="{{multiIndex}}" range="{{multiArray}}">
          <view class="picker">{{araeinfo.userName}}</view>
        </picker> */
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
  // bindMultiPickerChange(e){
  //   console.log(e)
  // },
  // bindMultiPickerColumnChange(){
  //   console.log(e)
  // },
  bindDpmtChange(e){
    this.setData({
      ["areainfo.dpmtName"] : this.data.dpmtList[parseInt(e.detail.value)].name,
      ["areainfo.dpmtId"] : this.data.dpmtList[parseInt(e.detail.value)].id
    })
  },
  bindUserChange(e){
    this.setData({
      ["areainfo.userName"] : this.data.userList[parseInt(e.detail.value)].name,
      ["areainfo.userId"] : this.data.userList[parseInt(e.detail.value)]._id
    })
  },
  formInputChange(e) {
    console.log(e)
    const field = e.currentTarget.dataset.field
    this.setData({
      [`areainfo.${field}`]: e.detail.value
    })
  },
  onSubmit(){
    let areainfo = this.data.areainfo;
    const db = wx.cloud.database();
    db.collection("area").where({
      id : areainfo.id
    }).update({
      data :areainfo
    }).then(res=>{
      console.log(res)
      if(res.stats.updated == 1){
        wx.showToast({
          title: '保存成功',
          duration:1000
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})