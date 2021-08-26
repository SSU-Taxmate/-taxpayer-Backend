"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var saltRounds = 10;

var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 5
  },

  /*로그인 세션 확인용*/
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  },

  /*superAdmin:0, 
  모든 DB접근가능
  선생님 : 1 , 학생 2 */
  role: {
    type: Number,
    "default": 1
  }
  /*선생님은 학급을 개설할 때마다 
  학생은 학급에 참여할 때마다
  --선생님이 학생 삭제할 수 있게*/

});
userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this; // console.log('user._id', user._id)
  // jsonwebtoken을 이용해서 token을 생성하기 

  var token = jwt.sign(user._id.toHexString(), 'secretToken'); // user._id + 'secretToken' = token 
  // -> 
  // 'secretToken' -> user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this; // user._id + ''  = token
  //토큰을 decode 한다. 

  jwt.verify(token, 'secretToken', function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에 
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({
      "_id": decoded,
      "token": token
    }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

var User = mongoose.model('User', userSchema);
module.exports = {
  User: User
};