// 云函数入口文件
const cloud = require('wx-server-sdk')

var rp = require("request-promise");
var md5= require('md5-node');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let Userkey='9c6f400cf9d342a0ae7977d935f2f99e'
  let SecretKey='730B3AA1D9C6311E210C717B2FEABCF8';
  let result = await cloud.database().collection("interface").where({
    CreditCode : null
  }).limit(10).get();
  console.log("==============")
  let companyList = result.data;
  console.log(companyList)
  for(let item of companyList){
    var str =encodeURI(item.company)
    var time = Math.round(new Date().getTime() / 1000)
    let Token=md5(Userkey+time+SecretKey).toUpperCase();
    let options  = {
      url :" http://api.qichacha.com/ECIV4/GetBasicDetailsByName?key="+Userkey+"&keyword=" +str,
      headers:{
        Token:Token,
        Timespan :time
      }
    }
    await rp(options).then(res=>{
      console.log(res)
      data = JSON.parse(res).Result;
      cloud.database().collection("interface").where({
        company : item.company
      }).remove();
      if(data != null){
        cloud.database().collection("interface").add({data});
      }
      // cloud.database().collection("interface").where({
      //   company : item.company
      // }).set({data});

    }).catch(res=>{
      
      console.log(res)
      data = JSON.parse(res);;
    })
  }
  return {
    data
  }
}