
// miniprogram/pages/editUser/editUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id :"",
    userinfo:[],
    authList:["2","6","9"],
    dpmtList:[],
    pageType:"edit",
    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    rules: [{
      name: 'name',
      rules: {required: true, message: '请填写姓名'},
    }, {
      name: 'tel',
      rules: [{required: true, message: '请填写联系电话'},{mobile: true, message: '手机号格式不对'}],
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
    console.log(options);
    if(options.id == undefined){
      this.setData({
        pageType : "add"
      })
    }else{
      this.setData({
        id : options.id,
        pageType : "edit"
      })
    }
    wx.showLoading({
      title: '正在加载中',
    })
    const db = wx.cloud.database();
    db.collection("dpmt").where({all : null}).field({
      _id : false
    }).get().then(res1=>{
      this.setData({
        dpmtList : res1.data
      })
      wx.hideLoading()
    })
    if(this.data.pageType=="edit"){
      db.collection('user').where({
        _id : this.data.id
      }).field({
        _openid : false
      }).get().then(res=>{
        this.setData({
          userinfo: res.data[0],
          authIndex : this.data.authList.indexOf(res.data[0].auth)
        })
        wx.hideLoading()
      });
    }
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

  onSubmit(){
    let userinfo = this.data.userinfo;
    delete userinfo._id;
    const db = wx.cloud.database();
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              this.setData({
                  error: errors[firstError[0]].message
              })
          }
      } else {
        if(this.data.pageType == "edit"){
          db.collection("user").where({
            _id : this.data.id
          }).update({
            data :userinfo
          }).then(res=>{
            console.log(res)
            if(res.stats.updated == 1){
              wx.showToast({
                title: '保存成功',
                duration:1000
              })
            }
          })
        }else{
          userinfo.idCode = userinfo.tel.substring(userinfo.tel.length - 6 ,userinfo.tel.length)
          db.collection("user").add({
            data :userinfo
          }).then(res=>{
            console.log(res)
            if(res.errMsg == "collection.add:ok"){
              wx.showToast({
                title: '添加成功',
                duration:1000
              })
              this.setData({
                pageType :"edit",
                id : res._id
              })
            }
          })
        }
      }
    })
  },
  onDelete(e){
    this.setData({
      dialogShow:true
    })
  },
  tapDialogButton(e){
    console.log(e)
    if(e.detail.index == 1){
      const db = wx.cloud.database();
      db.collection("user").where({
        _id : this.data.id
      }).remove().then(res=>{
        this.setData({
          dialogShow:false
        })
        wx.showToast({
          title: '删除成功',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000);
        
      })
    }else if(e.detail.index == 0){
      this.setData({
        dialogShow:false
      })
    }
  },
  bindAuthChange(e){
    this.setData({
      ["userinfo.auth"]: this.data.authList[parseInt(e.detail.value)]
    })
  },
  bindDpmtChange(e){
    this.setData({
      ["userinfo.dpmt"] : this.data.dpmtList[parseInt(e.detail.value)].name,
      ["userinfo.dpmtId"] : this.data.dpmtList[parseInt(e.detail.value)].dpmtId
    })
  },
  formInputChange(e) {
    console.log(e)
    const field = e.currentTarget.dataset.field
    this.setData({
      [`userinfo.${field}`]: e.detail.value
    })
  }
})