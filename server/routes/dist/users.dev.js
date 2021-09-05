"use strict";

var express = require('express');

var router = express.Router();

var _require = require("../models/User"),
    User = _require.User;

var _require2 = require("../middleware/auth"),
    auth = _require2.auth;

var nodemailer = require('nodemailer');

var bcrypt = require('bcrypt');

var _require3 = require('./middlewares'),
    isLoggedIn = _require3.isLoggedIn,
    isNotLoggedIn = _require3.isNotLoggedIn; //=================================
//             User
//=================================


router.get("/auth", auth, function (req, res) {
  //auth를 통과했다.( user와 token이 올바르다=로그인한 상태) 
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? true : false,

    /*0이면 선생님, 1이면 학생 */
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  });
});
router.post("/register", function _callee(req, res, next) {
  var myrole, _req$body, email, name, password, AuthNum, role, exUser, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          myrole = 1;
          _req$body = req.body, email = _req$body.email, name = _req$body.name, password = _req$body.password, AuthNum = _req$body.AuthNum, role = _req$body.role;

          if (role == '') {
            myrole = 1;
          } else {
            myrole = 0;
          }

          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          exUser = _context.sent;

          if (!exUser) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            err: '이미가입된 회원입니다'
          }));

        case 9:
          if (!(req.body.AuthNum == 0)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            err: '이메일 인증을 먼저 진행해주세요'
          }));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(User.create({
            email: email,
            name: name,
            password: password,
            token: "",
            tokenExp: null,
            role: myrole
          }));

        case 13:
          user = _context.sent;
          return _context.abrupt("return", res.json({
            success: true,
            err: '회원가입성공!'
          }));

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", res.json({
            success: false,
            err: '회원가입실패'
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 18]]);
});
router.post('/email', function _callee2(req, res, next) {
  var email, name, sId, emailverify, password, confirmpassword, entryCode, exUser, authNum, emailTemplete, transporter, mailOptions;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          name = req.body.name;
          sId = req.body.sId;
          emailverify = req.body.emailverify;
          password = req.body.password;
          confirmpassword = req.body.confirmpassword;
          entryCode = req.body.entryCode; // 이미 가입된 이메일인지 확인

          _context2.prev = 7;
          _context2.next = 10;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 10:
          exUser = _context2.sent;

          // 이메일 중복 확인
          if (exUser) {
            console.log('이미 가입된 이메일입니다.');
            res.send('email_error=exist'); // return res.status(403).send('error 설명 메시지');

            next(error);
          }

          authNum = Math.random().toString().substr(2, 6); //인증번호

          // ejs.renderFile(appDir + '/config/authemail.ejs', { authCode: authNum }, function(err, data) {
          //     if (err) { console.log(err) }
          //     emailTemplete = data;
          // });
          //transport는 메일을 보낼 객체이다.
          transporter = nodemailer.createTransport({
            //service: 'Naver' _ 네이버는 전송이 안됨............
            host: 'smtp.gmail.com',
            //호스트의 경우는 
            port: 465,
            //네이버에서 확인가능함.
            secure: true,
            // true for 465, false for other ports
            auth: {
              user: "noino19990819@gmail.com",
              //메일 서버의 계정.
              pass: "Ro68523200!"
            }
          });
          console.log(process.env.REACT_APP_NODEMAILER_USER);
          mailOptions = {
            from: 'Taxmate',
            to: email,
            subject: '회원가입을 위한 인증번호를 입력해주세요.',
            html: "오른쪽 숫자 6자리를 입력해주세요 : " + authNum //emailTemplete,

          };
          transporter.sendMail(mailOptions, function (emailError, info) {
            if (emailError) {
              console.log(emailError);
              console.log('메일 보내기 실패 in /email');
              next(emailError);
            } else {
              console.log("Finish sending email : " + info.response);
              res.send(authNum); // 인증번호
              // res.redirect( path.join(__dirname, '/signup'));

              transporter.close();
            }
          });
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](7);
          return _context2.abrupt("return", res.status(403).send('This account does not exist'));

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 19]]);
});
router.post("/login", function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (!user) return res.json({
      loginSuccess: false,
      message: "Auth failed, email not found"
    }); // 비밀번호 비교

    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) return res.json({
        loginSuccess: false,
        message: "Wrong password"
      }); // Token 생성

      user.generateToken(function (err, user) {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id
        });
      });
    });
  });
});
router.get("/logout", auth, function (req, res) {
  //undefined로 에러나는 중 console.log(req.user._id)
  User.findOneAndUpdate({
    _id: req.user._id
  }, {
    token: "",
    tokenExp: ""
  }, function (err, doc) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).send({
      success: true
    });
  });
}); // router.post('/:id/', isLoggedIn, async (req, res, next) => {
//   try {
//     const user = await User.findOne({ where: { id: req.user.id } });
//     if (user) {
//       await user.addFollowing(parseInt(req.params.id, 10));
//       res.send('success');
//     } else {
//       res.status(404).send('no user');
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

module.exports = router;