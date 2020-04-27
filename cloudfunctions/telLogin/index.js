// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const wxContext = cloud.getWXContext()
  //获取数据库对象
  const db = cloud.database();
  //获取权限信息的集合
  const authCol = db.collection('auth');
  //获取用户信息的集合
  const userinfoCol = db.collection('userinfo');
  console.log("aaaaaaa"+event.tel);
  //先在用户信息中查找
  const result = await userinfoCol.where({
    tel: event.tel
  }).get();
  console.log(result)
  if(result.data.length == 1){
    return {
      code : "error",
      data : "该用户已存在"
    }
  }else{
    const authInfo = await authCol.where({
      tel: event.tel
    }).get();
    console.log(authInfo);
    //1、如果在权限列表中，则可以登录
    if (authInfo.data.length == 1) {
      //向用户信息中写入
      const addres = await userinfoCol.add({
        data : {
          openid: wxContext.OPENID,
          tel: event.tel,
          collectList: []
        },
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      });
      console.log(addres);
      return {
        code: "success",
        data: authInfo.data[0]
      }
    }else{
      return {
        code: "fail"
      }
    }
  }
  return {
    code: "fail"
  }
}