// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //获取数据库对象
  const db = cloud.database();
  //获取用户信息的集合
  const userinfoCol = db.collection('userinfo');
  //先查看openid是否绑定过手机号
  const result = await userinfoCol.where({
    openid: wxContext.OPENID
  }).get();
  console.log(result)
  //1、如果已经登录，则可获得完整的用户信息
  if (result.data.length == 1){
    let tel = result.data[0].tel;
    //获取权限信息的集合
    const authCol = db.collection('auth');
    //先查看openid是否绑定过手机号
    const authInfo = await authCol.where({
      tel: tel
    }).get();
    if (authInfo.data.length == 1){
      //获取公司信息的集合
      const cmpCol = db.collection('company');
      let collectList = result.data[0].collectList ;
      let collectArray = await cmpCol.where({
        stdCode: db.command.in(collectList)
      }).get();
      return {
        code : "success",
        data : {
          authInfo: authInfo.data[0],
          userInfo: result.data[0],
          collectArray: collectArray.data
        }
      }
    }
  }
  //2、如果没有登录则返回未登录
  return {
    code : "fail"
  }
}