// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //获取数据库对象
  const db = cloud.database();
  //获取权限信息的集合
  const userinfoCol = db.collection('userinfo');
  //
  const result = await userinfoCol.where({
    openid: wxContext.openid
  }).get();
  if(result.data.length == 0){
    return {
      
    }
  }
  return {
    cmpList: result.data
  }
}