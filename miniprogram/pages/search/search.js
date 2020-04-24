// miniprogram/pages/search/search.js
Page({

  data: {
    cmpList:[
      
    ],
    searchList:[

    ],
    tip:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1,获取企业名单
    //调用云函数获取页面需要展示的数据
    const _this = this;
    wx.cloud.callFunction({
      name: 'getcmplist',
      success: function (res) {
        console.log(res);
        _this.setData({
          cmpList: res.result.cmpList,
          tip :"已收录开发区" + res.result.cmpList.length + "家企业信息"
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  //监听输入的汉字
  onInput: function(e){
    console.log("input输入的是："+e.detail.value);
    //2,监听输入信息，在名单中查询出来
    let value = e.detail.value.trim();
    let searchList = []; 
    console.log(this.data.cmpList);
    if((value+"").length != 0){
      for(let item of this.data.cmpList){
        console.log(item);
        console.log(item.cmpName.toString().indexOf(value));
        if(item.cmpName.toString().indexOf(value) != -1){
          searchList.push(item)
        }
      }
    }
    let newTip = "共找到" + searchList.length + "家企业";
    //3,展示查询出的企业名单
    this.setData({
      searchList : searchList,
      tip : newTip
    })
  }
})