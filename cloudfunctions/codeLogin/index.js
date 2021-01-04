// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const accountCol = db.collection('account');
  //先查看此openid是否访问过
  const result = await accountCol.where({
    openid: wxContext.OPENID
  }).get();
  console.log(result)
  //如果已绑定用户，则可获得用户的账户信息
  if (result.data.length == 0){
    let accountInfo = {
      openid = wxContext.OPENID
    }
    let loginCode = event.loginCode;
    let userInfo = await db.collection('user').where({
      idCode : loginCode
    }).get()
    if (userInfo.length == 0){
      //身份码错误
      
    }else if(userInfo.length == 1){
      //身份码校对成功

    }
  }else if(result.data.length == 1){
    //如果记录已存在，然后看是否已超失败次数
    if(result.data[0].failNumber >= 3 ){
      return {
        code : "fail",
        data : "失败次数过多，请联系管理员"
      }
    }else{
      let loginCode = event.loginCode;
      let userInfo = await db.collection('user').where({
        idCode : loginCode
      }).get()
      if (userInfo.length == 0){
        //身份码错误，失败次数+1
      
      }else if(userInfo.length == 1){
        //身份码校对成功
        let userInfo = await db.collection('user').where({
          id : result.data[0].userId
        }).get()
        return {
          code : "success",
          data : {
            accountInfo: result.data[0],
            userInfo: userInfo.data[0]
          }
        }
      }
    }
  }
  //2、如果没有登录则返回未登录
  return {
    code : "fail"
  }
}