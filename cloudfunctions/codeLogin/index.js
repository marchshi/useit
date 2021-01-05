// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  //先查看此openid是否访问过
  const accountRes = await db.collection('account').where({
    openid: wxContext.OPENID
  }).get();
  //如果初次访问，就先给他加一条记录，省得后面要判断是否有这条记录
  let accountInfo = {}
  if( accountRes.data.length == 0){
    await db.collection("account").add({
      data :{
        openid : wxContext.OPENID,
        failNumber : 0
      }
    })
    accountInfo = (await db.collection("account").where({
      openid : wxContext.OPENID
    }).get()).data[0];
  }else{
    accountInfo = accountRes.data[0]
  }
  if(parseInt(accountInfo.failNumber) >= 3){
    return {
      code : "fail",
      data : "失败次数过多，请联系管理员!" + wxContext.OPENID.substring(21)
    }
  }
  let loginCode = event.loginCode;
  let userRes = await db.collection('user').where({
    idCode : loginCode
  }).get()
  if( userRes.data.length == 1 && !(accountInfo.userId) ){
    //登录成功
    let updataRes = await db.collection("account").where({
      openid : wxContext.OPENID
    }).update({
      data :{
        userId : userRes.data[0]._id
      }
    })
    console.log(updataRes)
    let accountRes = await db.collection('account').where({
      openid: wxContext.OPENID
    }).get();
    if(updataRes.stats.updated == 1){
      return{
        code : "success",
        data : {
          userInfo : userRes.data[0],
          accountInfo : accountRes.data[0]

        }
      }
    }
  }else{
    //登录失败 失败次数+1
    await db.collection("account").where({
      openid : wxContext.OPENID
    }).update({
      data :{
        failNumber : db.command.inc(1)
      }
    })
    let str = parseInt(accountInfo.failNumber)==2 
      ? "失败次数过多，请联系管理员!"+(wxContext.OPENID.substring(21))
      :"身份码错误，还有"+(2-parseInt(accountInfo.failNumber))+"次尝试机会"
    return{
      code : "fail",
      data : str,
    }
  }

  //2、如果没有登录则返回未登录
  return {
    code : "fail",
    data : "登录失败，请联系管理员获取正确的身份码！",
  }
}