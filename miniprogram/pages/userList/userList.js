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
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
    wx.showLoading({
      title: '正在连接服务器',
      mask: true,
    })
},
search: function (value) {
  return new Promise((resolve, reject) => {
    let userList = this.data.userList;
    let searchList = []; 
    if((value+"").length != 0){
      for(let item of userList){
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
selectResult: function (e) {
    console.log('select result', e.detail)
    wx.navigateTo({
      url: "/pages/editUser/editUser?id="+e.detail.item.id,
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
    //1、获取数据库引用
    const db = wx.cloud.database();
    const that = this;
    //promise获取到总数后根据总数进行查询
    new Promise((resolve, reject) => {
      db.collection("user").count().then(res => resolve(res.total)).catch(e => reject("获取总数失败"));
    }).then(total=>{
      let userList = [];
      console.log(total)
      for (let i = 0; i < total; i += 20) {
        //promise每次获取完列表后
        new Promise((resolve, reject) => {
          db.collection("user").orderBy("id", "asc").skip(i).limit(20).get().then(res=>resolve(res.data)).catch(e=>reject("查询列表失败"))
        }).then(res=>{
          userList = userList.concat(res);
          if (userList.length == total){
            console.log("获取数据成功")
            // userList = userList.sort("id"); 
            //对用户列表进行排序
            for(let m = 0 ; m < userList.length-1 ; m++){
              for (let n = m + 1; n < userList.length ; n++){
                if (parseInt(userList[m].id) > parseInt(userList[n].id) ){
                  let temp = userList[m];
                  userList[m] = userList[n];
                  userList[n] = temp;
                }  
              }
            }
            that.setData({
              userList: userList
            })
            wx.hideLoading();
          }
        })
      }
    }).catch(res=>console.log(res+"1111"))
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})