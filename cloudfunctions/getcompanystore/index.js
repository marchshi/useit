// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const bigtable = cloud.database().collection('company');
  //获取所有企业的cmpId和cmpName
  const result1 = await cloud.database().collection('companyStore').where({
    all : null
  })
  .orderBy("id","asc")
  .field({
    name: true,
    stdCode: true,
    _id : false
  })
  .limit(1000)
  .get();
  console.log(result1);
  const result2 = await cloud.database().collection('companyStore').where({
    all : null
  })
  .orderBy("id","asc")
  .field({
    name: true,
    stdCode: true,
    _id : false
  })
  .limit(1000).skip(1000)
  .get();
  console.log(result2);
  let companyStore = result1.data.concat(result2.data);
  return {
    companyStore: JSON.stringify(companyStore)
  }
}