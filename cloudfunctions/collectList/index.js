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
  //找到这个用户的数据
  const result = await userinfoCol.where({
    openid: wxContext.OPENID
  }).get();
  let collectList = result.data[0].collectList ;
  let indexOf = collectList.indexOf(event.stdCode + "");
  if (indexOf >= 0){
    //取消收藏
    collectList.splice(indexOf,1);
  }else{
    //添加收藏
    collectList.push(event.stdCode+"");
  }
  await userinfoCol.where({
    openid: wxContext.OPENID
  }).update({
    data: {
      collectList: collectList
    },
    success: function (res) {
      console.log(res)
    }
  })
  return {
    isCollect: indexOf >= 0 ? false : true,
    collectList: collectList,
  }
}