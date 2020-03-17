// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //获取上下文
  const wxContext = cloud.getWXContext();
  //获取数据库对象
  const db = cloud.database();
  //获取保存公司信息的集合
  const cmpCol = db.collection('company');
  //获取集合中的指定ID的企业信息

  const result = await cmpCol.where({
      cmpId : event.cmpId
    }).get();

  return {
    cmpInfo : result.data[0]
  }
}