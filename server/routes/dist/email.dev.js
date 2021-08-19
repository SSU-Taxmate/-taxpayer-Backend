"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var express = require('express');

var router = express.Router();

var nodemailer = require('nodemailer');

var ejs = require('ejs');

var path = require('path');

var User = require('../models/user');

var appDir = path.dirname(require.main.filename);

var _require = require('./middlewares'),
    isLoggedIn = _require.isLoggedIn,
    isNotLoggedIn = _require.isNotLoggedIn;

router.post('/', isNotLoggedIn, function _callee(req, res, next) {
  var email, name, sId, emailverify, password, confirmpassword, entryCode, exUser, authNum, emailTemplete, transporter, mailOptions;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          name = req.body.name;
          sId = req.body.sId;
          emailverify = req.body.emailverify;
          password = req.body.password;
          confirmpassword = req.body.confirmpassword;
          entryCode = req.body.entryCode;
          router.get('/dotenv', function (req, res, next) {
            // DB_NAME 출력
            res.send(process.env.DB_NAME);
          });
          console.log(req.body);
          console.log('넘어온 이메일:' + req.body.email); // 이미 가입된 이메일인지 확인

          _context.prev = 10;
          _context.next = 13;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 13:
          exUser = _context.sent;

          // 이메일 중복 확인
          if (exUser) {
            console.log('이미 가입된 이메일입니다.');
            res.send('email_error=exist'); // return res.status(403).send('error 설명 메시지');

            next(error);
          }

          authNum = Math.random().toString().substr(2, 6); //인증번호

          ejs.renderFile(appDir + '/config/authemail.ejs', {
            authCode: authNum
          }, function (err, data) {
            if (err) {
              console.log(err);
            }

            emailTemplete = data;
          }); //transport는 메일을 보낼 객체이다.

          transporter = nodemailer.createTransport({
            service: 'Naver',
            // host: 'smtp.gmail.com', //호스트의 경우는 
            port: 465,
            //네이버에서 확인가능함.
            secure: true,
            // true for 465, false for other ports
            auth: {
              user: process.env.NODEMAILER_USER,
              //메일 서버의 계정.
              pass: process.env.NODEMAILER_PASS
            }
          });
          mailOptions = {
            from: 'TaxMate',
            to: email,
            subject: '회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplete
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
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](10);
          return _context.abrupt("return", res.status(403).send('This account does not exist'));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 22]]);
});

var Signup_page =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Signup_page, _React$Component);

  function Signup_page(props) {
    var _this;

    _classCallCheck(this, Signup_page);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Signup_page).call(this, props));
    _this.state = {
      email: '' // 입력받은 email state값

    };
    _this.sendEmail = _this.sendEmail.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Signup_page, [{
    key: "sendEmail",
    value: function sendEmail(e) {
      e.preventDefault();
      console.log(this.state.email);
      var data = {
        //현재의 email state값을 data객체로 감쌌다
        email: this.state.email
      };
      fetch('http://localhost:3000/sendEmail', {
        //sendEmail 라우터로 보내버리기
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(function (res) {
        return res.json();
      }).then(function (json) {});
    }
  }]);

  return Signup_page;
}(React.Component);

module.exports = router;