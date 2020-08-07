// miniprogram/pages/chooseCompany/chooseCompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyList :[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
    const _this = this;
    wx.cloud.callFunction({
      name: 'getcompanystore',
      success: function (res) {
        let companyStore = JSON.parse(res.result.companyStore);
        _this.setData({
          companyList: companyStore
        })

      },
      fail: console.error
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
  selectResult: function (e) {
    console.log('select result', e.detail);
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit("getCompanyNameStdCode",{
      data :{
        name : e.detail.item.name,
        stdCode : e.detail.item.stdCode
      }
    })
    wx.navigateBack();
  },
  search :function(value){
    console.log(value)
    return new Promise((resolve, reject) => {
      console.log(value)
      let companyList = this.data.companyList;
      let searchList = []; 
      if((value+"").length != 0){
        for(let item of companyList){
          if(item.name.toString().indexOf(value) != -1){
            item.text = item.name;
            searchList.push(item)
          }
        }
        console.log(searchList)
        resolve(searchList)
      }
    })
  },
})