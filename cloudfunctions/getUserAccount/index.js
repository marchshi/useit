// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const accountCol = db.collection('account');
  //先查看openid是否绑定用户
  const result = await accountCol.where({
    openid: wxContext.OPENID
  }).get();
  console.log(result)
  //1、如果已绑定用户，则可获得用户的账户信息
  if (result.data.length == 1){
    if(result.data[0].userId){
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
  //2、如果没有登录则返回未登录
  return {
    code : "fail"
  }
}