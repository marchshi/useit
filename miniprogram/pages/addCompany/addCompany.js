// miniprogram/pages/addCompany/addCompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyInfo:{
      stdCode :"",
      property : ""
    },
    ownClass:[
      { class : "101",className : "工业企业"},
      { class : "102",className : "其他"}
    ],
    leaseClass:[
      { class : "201",className : "工业企业"},
      { class : "202",className : "商贸办公"},
      { class : "203",className : "个体户"},
      { class : "204",className : "仓库物流"},
      { class : "205",className : "服务业"},
      { class : "206",className : "施工队"},
      { class : "207",className : "未工商注册"},
      { class : "208",className : "其他"},
    ],
    classList : [],
    property :["自有","租赁"],
    ownCompanyList:[],
    type : "add",
    rules: [{
        name: 'name',
        rules: {required: true, message: '请填写企业名称'},
      }, {
        name: 'property',
        rules: [{required: true, message: '请选择企业产权'}],
      }, {
        name: 'className',
        rules: {required: true, message: '请选择企业类别'},
      }
    ],
    dialogShow : false,
    dialogText : "该企业已存在"
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    console.log(options)
    let areaMap = {
      "1" : "一片区",
      "2" : "二片区",
      "3" : "二片区",
      "4" : "二片区",
      "5" : "二片区",
      "6" : "二片区",
    }
    if(options.type == "add"){
      this.setData({
        type : "add",
        ['companyInfo.blockId'] : options.blockid+"",
        ['companyInfo.blockName'] : options.blockid+"地块",
        ['companyInfo.areaId'] : options.areaid+"",
        ['companyInfo.areaName'] : areaMap[options.areaid+""],
      })
    }else
    if(options.type == "edit"){
      let id = options.id;
      db.collection("company1").where({
        _id : id
      }).get().then(res=>{
        console.log(res)
        let companyInfo = res.data[0];
        this.setData({
          type : "edit",
          companyInfo :companyInfo
        })
      })
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
    const db = wx.cloud.database();
    db.collection("company1").where({
      blockId : this.data.companyInfo.blockId,
      property : "自有"
    }).get().then(res=>{
      console.log(res)
      this.setData({
        ownCompanyList : res.data
      })
    })
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
        ['companyInfo.property'] : "自有",
        classList : this.data.ownClass
      })
    }else if (e.detail.value=="1"){
      this.setData({
        ['companyInfo.property'] : "租赁",
        classList : this.data.leaseClass
      })
    }
  },
  bindClassChange(e){
    console.log(e)
    this.setData({
      ["companyInfo.class"] : this.data.classList[parseInt(e.detail.value)].class,
      ["companyInfo.className"] : this.data.classList[parseInt(e.detail.value)].className
    })
  },
  bindOwnChange(e){
    console.log(e)
    this.setData({
      ["companyInfo.ownCompanyId"] : this.data.ownCompanyList[parseInt(e.detail.value)]._id,
      ["companyInfo.ownCompanyName"] : this.data.ownCompanyList[parseInt(e.detail.value)].name
    })
  },
  formInputChange(e) {
    console.log(e)
    const field = e.currentTarget.dataset.field
    this.setData({
      [`userinfo.${field}`]: e.detail.value
    })
  },
  onSubmit(){
    console.log(this.data.companyInfo)
    let companyInfo = this.data.companyInfo;
    companyInfo.time = new Date().getTime();
    console.log(companyInfo)
    /*
      对数据进行再次校验
      1、验证企业是否存在。如果企业已经存在，则进行提示进一步确认，如确实存在一厂多址情况则与管理员联系
      2、企业名称和统一社会信用代码通过企查查进行验证（前提是需要统一社会信用代码）102 207 208不需要
      3、如果是租赁企业，验证是否填写所在企业
    */
    const db = wx.cloud.database();
    db.collection("company1").where({
      name : companyInfo.name
    }).get().then(res=>{
      console.log(res)
      if(res.data.length == 1){
        this.setData({
          dialogShow : true,
          dialogText : "该企业已在"+res.data[0].areaName+res.data[0].blockName +"登记，请进一步确认。如存在一厂多址的情况请与管理员联系。"
        })
      }else{
        if(companyInfo.class!='102' && companyInfo.class!='207' && companyInfo.class!='208'){
          //对其信用代码的长度进行校验
          if(companyInfo.stdCode.length != 15 && companyInfo.stdCode.length != 18){
            this.setData({
              error : "请输入正确长度的统一社会信用代码"
            })
            return;
          }
          
          //调用接口查看企业名称和统一社会信用代码是否对应
        }
      }
    })
    
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