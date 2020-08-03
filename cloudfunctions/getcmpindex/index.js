// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //获取上下文
  const wxContext = cloud.getWXContext();
  //获取数据库对象
  const db = cloud.database();
  //获取公司信息的集合
  const bigtable = db.collection('company');
  //获取所有企业的cmpId和cmpName
  const result = await bigtable.where({
    all : null
  })
  .field({
    cmpId: true,
    cmpName: true,
    _id : false
  })
  .limit(1000)
  .get();
  console.log(result);
  return {
    cmpindex: JSON.stringify(result.data)
  }
}