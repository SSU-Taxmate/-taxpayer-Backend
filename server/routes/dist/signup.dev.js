"use strict";

var express = require('express');

var passport = require('passport');

var bcrypt = require('bcrypt'); //const User = require('../models/user');


var multer = require('multer');

var fs = require('fs');

var path = require('path'); // 현재 프로젝트의 경로


var router = express.Router();

var _require = require('./middlewares'),
    isLoggedIn = _require.isLoggedIn,
    isNotLoggedIn = _require.isNotLoggedIn;

var promotion; // 프로모션 수신 동의 여부

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

var upload = multer({
  storage: multer.diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function filename(req, file, cb) {
      var ext = path.extname('/media/user.png');
      cb(null, path.basename(file.originalname, ex) + Date.now() + ext);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 2024
  } //업로드 제한

});
router.get('/agree', function (req, res) {
  //res.send('This is signup page');
  res.render(path.join(__dirname, '../views/signup_agree.ejs'));
});
router.post('/agree', isNotLoggedIn, function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          promotion = req.body.promotion;
          console.log('promotion:' + promotion);
          res.send('success');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", next(_context.t0));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); // GET /signup 라우터 (signup으로 왔을때의 root)

router.get('/', function (req, res) {
  res.render(path.join(__dirname, '../views/signup.ejs'));
}); // POST /signup 라우터 
// 회원가입 form

router.post('/', isNotLoggedIn, function _callee2(req, res, next) {
  var _req$body, email, name, password, birth, AuthNum, exUser, hash, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, name = _req$body.name, password = _req$body.password, birth = _req$body.birth;
          AuthNum = req.body.AuthNum;
          console.log(AuthNum);
          console.log('회원가입 버튼 누름');
          console.log('email:' + email + ', name:' + name + ', password:' + password, 'promotion:', promotion);
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 8:
          exUser = _context2.sent;

          if (!exUser) {
            _context2.next = 12;
            break;
          }

          console.log('이미 가입된 회원입니다.');
          return _context2.abrupt("return", res.redirect('/signup?error=exist'));

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

        case 14:
          hash = _context2.sent;
          _context2.next = 17;
          return regeneratorRuntime.awrap(User.create({
            email: email,
            name: name,
            password: hash,
            birth: birth,
            promotion: promotion
          }));

        case 17:
          user = _context2.sent;
          console.log('추가된 user:' + user);
          res.send('success');
          next(); // return res.redirect('/login');

          _context2.next = 28;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](5);
          console.log('회원가입 에러');
          console.error(_context2.t0);
          return _context2.abrupt("return", next(_context2.t0));

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 23]]);
});
module.exports = router;