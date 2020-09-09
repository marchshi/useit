// 云函数入口文件
const cloud = require('wx-server-sdk')

var md5= require('md5-node');
var http = require("http");
var querystring = require('querystring');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let name = event.name;
  // let stdCode = event.stdCode;
  let Userkey='9c6f400cf9d342a0ae7977d935f2f99e'
  let TimeSpan=Math.round(new Date /1000);
  let SecretKey='730B3AA1D9C6311E210C717B2FEABCF8';
  let Token=md5(Userkey+TimeSpan+SecretKey).toUpperCase();
  var data = {key:Userkey,keyword:name};  
  var content = querystring.stringify(data);

  var options = {  
      hostname:'api.qichacha.com',
      method:'GET',  
      path:'/ECIV4/GetBasicDetailsByName?'+content,  
      headers:{  
          "Token": Token, 
          "Timespan":TimeSpan
      }  
  }  
    
  var req = http.request(options, function (res) { 
      console.log('STATUS: ' + res.statusCode); 
      console.log('HEADERS: ' + JSON.stringify(res.headers)); 
      res.setEncoding('utf8'); 
      res.on('data', function (chunk) { 
          console.log('BODY: ' + chunk); 
      }); 
  }); 
    
  req.on('error', function (e) { 
      console.log('problem with request: ' + e.message); 
  }); 
    
  req.end();
  
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }

}