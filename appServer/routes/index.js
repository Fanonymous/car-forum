var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  //获取get传参
  let username = req.query.username;
  let password = req.query.password;

  fs.readFile('./public/json/user.json', (err, data) => {
      let user = JSON.parse(data.toString());
      if (user[username] && user[username].password == password) {
          res.status(200).send({flag : 1,mini:user[username].name});
      }else {
          res.status(200).send({flag : 0});
      }
  })
});

router.get('/community', function(req, res, next) {
  fs.readFile('./public/json/community.json', (err, data) => {
      let result = JSON.parse(data.toString());
      res.status(200).send(result);
  })
});

router.get('/getReply', function(req, res, next) {
  //获取get传参
  let id = req.query.id;

  fs.readFile('./public/json/reply.json', (err, data) => {
      let user = JSON.parse(data.toString());
      if (user[id]) {
          res.status(200).send(user[id]);
      }else {
          res.status(200).send([]);
      }
  })
});

router.get('/addReply', function(req, res, next) {
  //获取get传参
  let username = req.query.username;
  let id = req.query.id;
  let content =  req.query.content;
  let time = new Date().Format("yyyy-MM-dd HH:mm:ss");
  fs.readFile('./public/json/reply.json', (err, data) => {
      let user = JSON.parse(data.toString());
      if (user[id]) {
          user[id].unshift({
            "username" : username,
            "content" : content,
            "time" : time
          })
        fs.writeFile('./public/json/reply.json', JSON.stringify(user), (err) => {
          if (err) {
            res.status(200).send({flag : 0});
          }else {
              fs.readFile('./public/json/community.json', (err, data) => {
                  let result = JSON.parse(data.toString());
                  result.forEach(val => {
                    if (val.id == id) {
                      val.sum = user[id].length
                    }
                  })
                  fs.writeFile('./public/json/community.json', JSON.stringify(result), (err) => {
                    if (!err) {
                      res.status(200).send({flag : 1});
                    }
                  })
              })
          }
        })
      }else {
        user[id] = {
          "username" : username,
          "content" : content,
          "time" : time
        }
        fs.writeFile('./public/json/reply.json', JSON.stringify(user), (err) => {
          if (err) {
            res.status(200).send({flag : 0});
          }else {
                fs.readFile('./public/json/community.json', (err, data) => {
                  let result = JSON.parse(data.toString());
                  result.forEach(val => {
                    if (val.id == id) {
                      val.sum = user[id].length
                    }
                  })
                  fs.writeFile('./public/json/community.json', JSON.stringify(result), (err) => {
                    if (!err) {
                      res.status(200).send({flag : 1});
                    }
                  })
              })
          }
        })
      }
  })
});


router.post('/test1', function(req, res, next) {
   //post传参  req.body
})

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "H+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
};
if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
for (var k in o)
if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
return fmt;
}
module.exports = router;
