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
    property :["自有","租赁"],
    ownCompanyList:[],
    type : "add",
    rules: [{
        name: 'name',
        rules: {required: true, message: '请填写企业名称'},
      },{
        name: 'prop',
        rules: {required: true, message: '请填写统一社会信用代码'},
      },{
        name: 'property',
        rules: [{required: true, message: '请选择企业产权'}],
      }
    ],
    dialogShow : false,
    buttons: [{text: '取消'}, {text: '确定'}],
    dialogText : "该企业已存在"
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    let that = this;
    console.log(options)
    let areaMap = {
      "1" : "一片区",
      "2" : "二片区",
      "3" : "三片区",
      "4" : "四片区",
      "5" : "五片区",
      "6" : "六片区",
    }
    if(options.type == "add"){
      that.setData({
        type : "add",
        ['companyInfo.blockId'] : options.blockid+"",
        ['companyInfo.blockName'] : options.blockid+"地块",
        ['companyInfo.areaId'] : options.areaid+"",
        ['companyInfo.areaName'] : areaMap[options.areaid+""]
      })
    }else if(options.type == "edit"){
      let id = options.id;
      db.collection("company").where({
        _id : id
      }).get().then(res=>{
        console.log(res)
        that.setData({
          type : "edit",
          companyInfo :res.data[0]
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
    db.collection("company").where({
      blockId : this.data.companyInfo.blockId,
      property : "自有"
    }).get().then(res=>{
      console.log(res)
      let ownCompanyList = res.data
      for(let i = 0;i<ownCompanyList.length ; i++){
        if(ownCompanyList[i]._id == this.data.companyInfo._id){
          ownCompanyList.splice(i,1)
          break
        }
      }
      this.setData({
        ownCompanyList : ownCompanyList
      })
    })
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
        ['companyInfo.property'] : "自有"
      })
    }else if (e.detail.value=="1"){
      this.setData({
        ['companyInfo.property'] : "租赁"
      })
    }
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
    
    const db = wx.cloud.database();
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
    if(this.data.type == "add"){
      db.collection("company").where({
        name : companyInfo.name
      }).get().then(res=>{
        console.log(res)
        if(res.data.length == 1){
          this.setData({
            dialogShow : true,
            dialogText : "该企业已在"+res.data[0].areaName+res.data[0].blockName +"登记，请进一步确认。如存在一厂多址的情况请与管理员联系。"
          })
          return
        }else{
          //对其信用代码的长度进行校验
          if(companyInfo.stdCode.length != 15 && companyInfo.stdCode.length != 18){
            this.setData({
              error : "请输入正确长度的统一社会信用代码"
            })
            return;
          }
          //调用接口查看企业名称和统一社会信用代码是否对应
        }
        if(!companyInfo.property){
          this.setData({
            dialogShow : true,
            dialogText : "请选择企业产权！"
          })
          return
        }
        if(companyInfo.property == "租赁" && !(companyInfo.ownCompanyId && companyInfo.ownCompanyName)){
          this.setData({
            dialogShow : true,
            dialogText : "请明确所在企业！"
          })
          return
        }
        db.collection("company").add({
          data: this.data.companyInfo
        }).then(res=>{
          console.log(res)
          wx.showToast({
            title: '添加成功',
            duration: 1000
          })
        })
      })
    }else if (this.data.type == "edit"){
      if(companyInfo.property == "租赁"){
        db.collection("company").where({
          ownCompanyId : companyInfo._id
        }).count().then(total=>{
          if(total > 0){
            this.setData({
              dialogShow : true,
              dialogText : "该企业内存在"+ total +"家租赁企业，请先取消租赁关系再更改产权！"
            })
            return
          }else{
            if(companyInfo.ownCompanyId && companyInfo.ownCompanyName){
              db.collection("company").where({
                _id : companyInfo._id
              }).update({
                data :{
                  property : companyInfo.property,
                  ownCompanyId : companyInfo.ownCompanyId,
                  ownCompanyName : companyInfo.ownCompanyName
                }
              }).then(res=>{
                console.log(res)
                wx.showToast({
                  title: '保存成功',
                  duration: 1000
                })
              })
            }else{
              this.setData({
                dialogShow : true,
                dialogText : "请明确所在企业！"
              })
              return
            }
          }
        })
      }else if(companyInfo.property == "自有"){
        db.collection("company").where({
          _id : companyInfo._id
        }).update({
          data :{
            property : companyInfo.property,
            ownCompanyId : null,
            ownCompanyName : null
          }
        }).then(res=>{
          console.log(res)
          wx.showToast({
            title: '保存成功',
            duration: 1000
          })
        })
      }
    }
    
  },
  onDelete(){
    
    this.setData({
      dialogShow:true
    })
  },
  tapDialogButton(e){
    console.log(e)
    if(e.detail.index == 1){
      const db = wx.cloud.database();
      let companyInfo = this.data.companyInfo;
      db.collection("company").where({
        ownCompanyId : companyInfo._id
      }).count().then(res=>{
        console.log(res)
        if(res.total == 0 ){
          db.collection("company").where({
            _id : companyInfo._id
          }).remove().then((res)=>{
            console.log(res)
            wx.showToast({
              title: '删除成功',
              duration: 1000
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1,
              })
            },1000)
          })
        }else{
          this.setData({
            dialogShow : false,
          })
          wx.showToast({
            title: "该企业内存在"+ res.total +"家租赁企业，请先取消租赁关系再删除企业！",
            duration: 2000,
            icon:"none"
          })
        }
      })
    }else{
      if(e.detail.index == 0){
        this.setData({
          dialogShow:false
        })
      }
    }
  }
})