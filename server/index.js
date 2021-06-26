//backend 시작점
const express = require('express')
const app = express()
const path=require('path');
const cors=require('cors')

const bodyParser = require('body-Parser');
const cookieParser = require('cookie-parser');

const config=require('./config/key');

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users',require('./routes/users'));
app.use('/api/stock',require('./routes/stock'));

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/hello', (req, res) => {
  res.send("asdf")
})

app.get('/api/tax/nation', (req, res) => {

  res.json({
    "data": [
      [
        {
          date: '2021/04/25',
          value: '2500',
          reason: '내맘222',
        },
        {
          date: '2021/04/29',
          value: '2500',
          reason: '내맘',
        },
        {
          date: '2021/04/28',
          value: '200',
          reason: '내맘3',
        },

      ],
      [
        {
          date: '2021/04/25',
          type: '직접세(뭐시기)',
          value: '100',
          sum: '누적합계'
        },
        {
          date: '2021/07/25',
          type: '직접세(뭐시기)',
          value: '300',
          sum: '누적합계'
        },
      ],
      [
        {
          date: '2021/04/25',
          type: '장학금',
          value: '100',
          sum: '누적지출'
        },
        {
          date: '2021/07/25',
          type: '문화복지',
          value: '-200',
          sum: '누적지출'
        },
      ]
    ],
    'columns': [
      [
        {
          title: '날짜',
          field: 'date',
        },
        {
          title: '금액(미소)',
          field: 'value',
          type: 'numeric'
        },
        {
          title: '이유',
          field: 'reason',
        },
      ],
      [
        {
          title: '날짜',
          field: 'date',
        },
        {
          title: '종류',
          field: 'type',
        },
        {
          title: '금액(미소)',
          field: 'value',
          type: 'numeric'

        },
        {
          title: '누적합계',
          field: 'sum',
        },
      ],
      [
        {
          title: '날짜',
          field: 'date',
        },
        {
          title: '지출종류',
          field: 'type',
        },
        {
          title: '금액(미소)',
          field: 'value',
          type: 'numeric'

        },
        {
          title: '지출합계',
          field: 'sum',
        },
      ]

    ]
  })
})

app.get('/api/stats/nation', (req, res) => {

  res.json({
    "data": [[
      {
        date: '2011/04/25',
        type: '일기',
        name: 'EJ',
        sId: '1',
        isComplete: 'X'
      },
      {
        date: '2012/04/25',
        type: '줄넘기',
        name: 'SJ',
        sId: '12',
        isComplete: 'O'
      },
      {
        date: '2015/04/25',
        type: '노래',
        name: 'MH',
        sId: '2',
        isComplete: '쿠폰'
      },
      {
        date: '2011/04/25',
        type: '일기',
        name: 'SA',
        sId: '3',
        isComplete: 'O'
      },
      {
        date: '2012/04/25',
        type: '줄넘기',
        name: 'EJ',
        sId: '1',
        isComplete: 'O'
      },
      {
        date: '2015/04/25',
        type: '노래',
        name: 'EJ',
        sId: '1',
        isComplete: 'O'
      },
      {
        date: '2011/04/25',
        type: '일기',
        name: 'ㄹㄹ',
        sId: '1',
        isComplete: 'O'
      },
      {
        date: '2012/04/25',
        type: '줄넘기',
        name: 'ㄹㄹ',
        sId: '1',
        isComplete: 'O'
      },
      {
        date: '2015/04/25',
        type: '노래',
        name: 'ㄹㄹ',
        sId: '1',
        isComplete: 'O'
      },
      {
        date: '2011/04/25',
        type: '일기',
        name: 'ㅠㅠ',
        sId: '1',
        isComplete: 'O'
      },
      {
        date: '2012/04/25',
        type: '줄넘기',
        name: 'ㅠㅠ',
        sId: '1',
        isComplete: 'O'
      },
      {
        date: '2015/04/25',
        type: '노래',
        name: 'EJ',
        sId: '1',
        isComplete: 'O'
      }
    ],
    [
      {
        date: '2020/06/06',
        type: '수학',
        detail: '수학익힘책 35쪽~45쪽'
      },
      {
        date: '2020/06/06',
        type: '일기',
        detail: ''
      },
      {
        date: '2020/06/06',
        type: '체육',
        detail: '줄넘기 10회이상'
      },
      {
        date: '2020/06/05',
        type: '수학',
        detail: '수학익힘책 25쪽~35쪽'
      },
      {
        date: '2020/06/05',
        type: '일기',
        detail: ''
      },
      {
        date: '2020/06/05',
        type: '체육',
        detail: '줄넘기 10회이상'
      }
    ],
    [
      {
        hwId: 1,
        type: '일기',
      },
      {
        hwId: 2,
        type: '줄넘기',
      },
      {
        hwId: 3,
        type: '수학',
      },
    ]

    ],
    'columns': [
      [{
        title: '날짜',
        field: 'date',
      },
      {
        title: '숙제종류',
        field: 'type',
      },
      {
        title: '이름',
        field: 'name',
      },
      {
        title: '번호',
        field: 'sId',
        type: 'numeric'
      },
      {
        title: '제출여부',
        field: 'isComplete',
        lookup: { O: 'O', X: 'X', 쿠폰: '쿠폰' },

      },
      ],
      [
        {
          title: '날짜',
          field: 'date',
          defaultGroupOrder: 0
        },
        {
          title: '종류',
          field: 'type',
        },
        {
          title: '상세설명',
          field: 'detail'
        },
      ],
      [
        {
          title: '종류',
          field: 'type',
        },
      ]
    ],
  })
})

app.get('/api/setting/class', (req, res) => {
  res.json({
    "data": [
      [
        { job: '우체부', personnel: 3, salary: 150, detail: 'Baran', qualification: '신용등급3등급이상' },
        { job: '통계청', personnel: 1, salary: 200, detail: 'Baran', qualification: '수학 자격증 5급 이상' },
        { job: '신용평가위원', personnel: 1, salary: 280, detail: 'Baran', qualification: '' },
        { job: '은행원', personnel: 1, salary: 200, detail: 'Baran', qualification: '6급이상 자격증 1개 이상' },
        { job: '교실청소부', personnel: 3, salary: 300, detail: 'Baran', qualification: '' },

      ], []
    ],
    "columns": [
      [
        { title: '직업명', field: 'job' },
        { title: '인원', field: 'personnel' },
        { title: '예상 월급(미소)', field: 'salary' },
        { title: '하는일', field: 'detail' },
        { title: '자격요건', field: 'qualification' },
      ], []
    ]
  })
})

const port = process.env.PORT || 5000


app.listen(port, () => console.log(`Example app listening on port ${port}!`))