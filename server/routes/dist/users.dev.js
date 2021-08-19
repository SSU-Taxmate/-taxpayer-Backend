"use strict";

var express = require('express');

var router = express.Router();

var _require = require("../models/User"),
    User = _require.User;

var _require2 = require("../middleware/auth"),
    auth = _require2.auth; //=================================
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
router.post("/register", function (req, res) {
  var user = new User(req.body);
  user.save(function (err, doc) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true
    });
  });
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