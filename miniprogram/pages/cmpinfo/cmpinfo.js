// miniprogram/pages/cmpinfo/cmpinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cmpId : null,
    cmpInfo :{

    },
    isCollect : false,
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cmpId = options.cmpId;
    //调用云函数获取页面需要展示的数据
    const _this = this;
    wx.cloud.callFunction({
      name: 'getcmpinfo',
      data:{
        cmpId : options.cmpId
      },
      success: function(res){
        //1、初始化判断该企业是否收藏
        let isCollect = false;
        let collectList = getApp().data.collectList;
        if (collectList.indexOf(res.result.data.stdCode) >= 0 ){
          isCollect = true;
        }
        console.log(res);
        //2、整理数据 先不判断该数据是否有效 先将里面的内容规整一下
        // let cmpInfo = res.result.data;
        // if(!cmpInfo.wanggeName || cmpInfo.wanggeName.length ==0 ){
        //   cmpInfo.wanggeName = "无"
        // }
        // if(!cmpInfo.farenName || cmpInfo.farenName.length ==0 ){
        //   cmpInfo.wanggeName = "无"
        // }
        // if(!cmpInfo.fuzeName || cmpInfo.fuzeName.length ==0 ){
        //   cmpInfo.wanggeName = "无"
        // }
        _this.setData({
          isCollect: isCollect,
          cmpInfo : res.result.data
        })
        
      },
      fail:console.error
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

  callFarenPhone : function (){
    console.log("111111");
    const tel = this.data.cmpInfo.farenTel +"";
    console.log(tel)
    wx.makePhoneCall({
      phoneNumber: tel,
      success: (result) => {
        console.log("拨打电话成功")
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  callFuzePhone : function (){
    const tel = this.data.cmpInfo.fuzeTel +"";
    console.log(tel)
    wx.makePhoneCall({
      phoneNumber: tel,
      success: (result) => {
        console.log("拨打电话成功")
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  callWanggePhone : function (){
    const tel = this.data.cmpInfo.wanggeTel +"";
    console.log(tel)
    wx.makePhoneCall({
      phoneNumber: tel,
      success: (result) => {
        console.log("拨打电话成功")
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  onCollectTap :function(){
    //修改收藏状态 添加和删除收藏
    let isCollect = this.data.isCollect ;
    //只要点击 就提交stdCode给后台判断
    let _this = this;
    wx.cloud.callFunction({
      name: 'collectList',
      data: {
        stdCode: _this.data.cmpInfo.stdCode
      },
      success: function (res) {
        console.log(res);
        _this.setData({
          isCollect: res.result.isCollect
        })
        if (res.result.isCollect){
          wx.showToast({
            title: '收藏成功',
            duration: 500,
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: '取消收藏成功',
            duration: 500,
            icon: 'none'
          })
        }
        
      },
      fail: console.error
    })
  },
  onShareAppMessage: function () {



  }

})