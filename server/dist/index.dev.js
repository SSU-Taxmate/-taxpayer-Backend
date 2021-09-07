"use strict";

//backend 시작점
var express = require('express');

var app = express();

var path = require('path');

var cors = require('cors');

var bodyParser = require('body-Parser');

var cookieParser = require('cookie-parser');

var config = require('./config/key');

var mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function () {
  return console.log('MongoDB Connected...');
})["catch"](function (err) {
  return console.log(err);
});
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
})); //express [stackoverflow-25471856]

app.use(bodyParser.json()); //express

app.use(cookieParser());
app.use('/api/users', require('./routes/users'));
/*클래스*/

app.use('/api/classes', require('./routes/class'));
/*학생-class에 속함*/

app.use('/api/students', require('./routes/student'));
/*은행 */

app.use('/api/bank', require('./routes/bank'));
/* 직업 */

app.use('/api/jobs', require('./routes/job'));
/*주식 */

app.use('/api/stocks', require('./routes/stock'));
/*통계청 */

app.use('/api/homeworks', require('./routes/homework'));
/* 국세청 */

app.use('/api/taxes', require('./routes/tax'));
app.use('/api/budget', require('./routes/budget'));
/* 법 */

app.use('/api/laws', require('./routes/law'));
/* 논의중인 법 */

app.use('/api/congress', require('./routes/congress'));
/* cron */
//app.use('/api/batch',require('./routes/batch'))

/* 벌금 */

app.use('/api/fine', require('./routes/fine'));
/* 대시보드 */

app.use('/api/dashboard', require('./routes/dashboard'));
app.get('/', function (req, res) {
  return res.send('Hello World!');
});
app.get('/api/stats/nation', function (req, res) {
  res.json({
    "data": [[{
      date: '2011/04/25',
      type: '일기',
      name: 'EJ',
      sId: '1',
      isComplete: 'X'
    }, {
      date: '2012/04/25',
      type: '줄넘기',
      name: 'SJ',
      sId: '12',
      isComplete: 'O'
    }, {
      date: '2015/04/25',
      type: '노래',
      name: 'MH',
      sId: '2',
      isComplete: '쿠폰'
    }, {
      date: '2011/04/25',
      type: '일기',
      name: 'SA',
      sId: '3',
      isComplete: 'O'
    }, {
      date: '2012/04/25',
      type: '줄넘기',
      name: 'EJ',
      sId: '1',
      isComplete: 'O'
    }, {
      date: '2015/04/25',
      type: '노래',
      name: 'EJ',
      sId: '1',
      isComplete: 'O'
    }, {
      date: '2011/04/25',
      type: '일기',
      name: 'ㄹㄹ',
      sId: '1',
      isComplete: 'O'
    }, {
      date: '2012/04/25',
      type: '줄넘기',
      name: 'ㄹㄹ',
      sId: '1',
      isComplete: 'O'
    }, {
      date: '2015/04/25',
      type: '노래',
      name: 'ㄹㄹ',
      sId: '1',
      isComplete: 'O'
    }, {
      date: '2011/04/25',
      type: '일기',
      name: 'ㅠㅠ',
      sId: '1',
      isComplete: 'O'
    }, {
      date: '2012/04/25',
      type: '줄넘기',
      name: 'ㅠㅠ',
      sId: '1',
      isComplete: 'O'
    }, {
      date: '2015/04/25',
      type: '노래',
      name: 'EJ',
      sId: '1',
      isComplete: 'O'
    }], [{
      date: '2020/06/06',
      type: '수학',
      detail: '수학익힘책 35쪽~45쪽'
    }, {
      date: '2020/06/06',
      type: '일기',
      detail: ''
    }, {
      date: '2020/06/06',
      type: '체육',
      detail: '줄넘기 10회이상'
    }, {
      date: '2020/06/05',
      type: '수학',
      detail: '수학익힘책 25쪽~35쪽'
    }, {
      date: '2020/06/05',
      type: '일기',
      detail: ''
    }, {
      date: '2020/06/05',
      type: '체육',
      detail: '줄넘기 10회이상'
    }], [{
      hwId: 1,
      type: '일기'
    }, {
      hwId: 2,
      type: '줄넘기'
    }, {
      hwId: 3,
      type: '수학'
    }]],
    'columns': [[{
      title: '날짜',
      field: 'date'
    }, {
      title: '숙제종류',
      field: 'type'
    }, {
      title: '이름',
      field: 'name'
    }, {
      title: '번호',
      field: 'sId',
      type: 'numeric'
    }, {
      title: '제출여부',
      field: 'isComplete',
      lookup: {
        O: 'O',
        X: 'X',
        쿠폰: '쿠폰'
      }
    }], [{
      title: '날짜',
      field: 'date',
      defaultGroupOrder: 0
    }, {
      title: '종류',
      field: 'type'
    }, {
      title: '상세설명',
      field: 'detail'
    }], [{
      title: '종류',
      field: 'type'
    }]]
  });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  return console.log("Example app listening on port ".concat(port, "!"));
});