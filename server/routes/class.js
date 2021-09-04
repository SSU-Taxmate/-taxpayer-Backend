/* base URL
  : /api/classes
*/
const express = require('express');
const { startSession } = require('mongoose');
const { Account } = require('../models/Bank/Account');
const { Budget } = require('../models/Tax/Budget');
const { Class } = require('../models/Class');
const { JoinedUser } = require('../models/JoinedUser')
const { Tax } = require('../models/Tax/Tax');
const { StockAccount } = require('../models/Stock/StockAccount');

const router = express.Router();

/*
  [정상] class 생성
*/
router.post('/', async(req, res) => {
    const session = await startSession();
    try {
        //console.log('시작')
        // 트랜젝션 시작
        session.startTransaction();
            // 1) Class 생성
            // 1-1) Class 생성시 랜덤번호 부여.
        var Random = Math.floor(Math.random() * 89999) + 10000 //10000~99999사이의값.
        // console.log("랜덤" + Random);
        while (entry_check = await Class.findOne({ entrycode: Random })){
          Random = Random+1;
          // console.log("랜덤_중복" + Random);
          if (Random>99999){
            Random=10000;
          }
        } // 중복없는 랜덤번호
        const cClass = await Class.create({
          name: req.body.name,
          image: req.body.image,
          comment: req.body.comment,
          teacherId: req.body.teacherId,
          entrycode: Random
      });
        const classres = await cClass.save({ session })
        //console.log('cClass', cClass)
            // 2) Tax default 생성
        const cTax = new Tax({ classId: cClass._id });
        //console.log('cTax',cTax)
        const taxres = await cTax.save({ session })
            //console.log(taxres)
            // 3) Class Account 생성
        const budget = new Budget({ classId: cClass._id });
        //console.log(budget)
        const accountres = await budget.save({ session });
        //console.log(accountres)
        // 트랜젝션 커밋
        await session.commitTransaction();
        // 끝
        session.endSession();
        res.status(200).json({
            success: true
        })
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.json({ success: false, err })
    }
})

/*
  [정상] classes 불러오기
  : 선생님, 학생 (role)에 따라 찾아야할 위치가 다르다.
    - req.query{userId:} _학생or선생님
*/
router.get('/', (req, res) => {
        //console.log('/server/routes/class', req.query)
        if (req.query.role === '0') { //선생님 - Class의 teacher가 일치하는 값
            Class.find({ teacherId: req.query.userId }, function(err, classes) {
                if (err) return res.status(500).json({ error: err });
                res.json(classes)
            })

        } else { //학생- JoinedUser의 userId가 일치하는 값  
            const a = async() => {
                const userclass = await JoinedUser.find({ userId: req.query.userId }, 'classId')
                var classIds = []
                for (let i = 0; i < userclass.length; i++) {
                    classIds.push(userclass[i].classId)
                }
                //학생이 속해있는 class정보 얻음.
                const classInfo = await Class.find({ _id: { "$in": classIds } })
                return res.json(classInfo)
            }
            a();
        }
    })
    /*
      [정상] class 정보 업데이트
      : comment, image
    */
router.put('/', (req, res) => {
        //console.log(req.body)
        Class.updateOne({ _id: req.body._id }, { $set: req.body }, (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            })
        })

    })
    /*
      class 삭제 - 미완 (Cascade- 모두 합친 cascade)
      : (1) ClassId - Tax, Stock, Homework 모두 삭제
        (2) ClassId - Class 삭제
        - req.query{classId:}
    */
router.delete('/:id', async(req, res) => { /*role확인*/
    //classId필수
    console.log(req.params.id)
    const classId = req.params.id
    const session = await startSession();
    try {
        // 트랜젝션 시작
        session.startTransaction();
        //(1) tax에서 TaxId 확인 및 Tax에서 삭제
        //(2) stock에서 StockId 확인 및 Stock에서 삭제
        //(3) homework
        //(final) classId에 해당하는 Class 삭제
        await Class.find({ _id: classId }).deleteOne().session({ session })
            // 트랜젝션 커밋
        await session.commitTransaction();
        // 트랜젝션 종료
        session.endSession();

        res.status(200).json({
            success: true
        })
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.json({ success: false, err });
    }
    //ClassTax  deleteMany()

})

/*
  [정상/리팩토링필요] Class에 Join하기 위한 목적
  : 학생이 참가코드입력
*/
// transaction이 필요한지는 조금 더 고민해보자
router.post('/join', async(req, res) => {
        console.log('/classes/join',req.body)
        const session = await startSession();
        try {
            // 트랜젝션 시작
            session.startTransaction();
            // (1) class에서 entry code로 참가할 class를 찾는다.
            const classInfo = await Class.findOne({ entrycode: req.body.entrycode }).session(session)
                //console.log(classInfo)
                // (2) JoinedUser 스키마에 학생ID, classID를 넣어 학생을 등록시킨다.
            const cjoineduser = new JoinedUser({ userId: req.body.userId, classId: classInfo._id });
            const savejoineduser = await cjoineduser.save({ session })
                //console.log('Save Joined User',savejoineduser)
                // (3) 기본 계좌 개설
            const caccount = new Account({ studentId: cjoineduser._id })
                //console.log('create Account',caccount)
            const saveaccount = await caccount.save({ session })
                // (4) 주식 계좌 개설
            const saccount = new StockAccount({ studentId: cjoineduser._id })
            const savesaccount = await saccount.save({ session })

            // 트랜젝션 커밋
            await session.commitTransaction();
            // 트랜젝션 종료
            session.endSession();

            res.status(200).json({
                success: true
            })
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            res.json({ success: false, err });
        }
    })
    /*
      [정상]class에 join한 User의 class내 ID
      : redux에 저장하기 위해서 사용
    */
router.get('/:id/join', (req, res) => {
        //console.log(req.params.id,req.query)
        const classId = req.params.id
        const userId = req.query.userId
        JoinedUser.findOne({ classId: classId, userId: userId }, function(err, joineduser) {
            //console.log(joineduser)
            const result = joineduser._id
            if (err) return res.status(500).json({ error: err });
            res.json(result)
        })
    })
    /*
      [] JoinedUser 학생 한명 삭제
      학생의 클래스 탈퇴
      클래스에 속한 학생의 모든 정보를 삭제해야 함
    */
router.delete('/:id/join', (req, res) => {
    // {classId:, userId:}
    console.log(req.params.id, req.query.userId)
    const classId = req.params.id
    const userId = req.query.userId

    JoinedUser.findOne({ classId: classId, userId: userId }).deleteOne(function(err) {
        if (err) return handleError(err);
        res.json({ success: true })
    });
})

// class extends React.Component {
//     state = { number: [0, 0, 0, 0, 0, 0, 0] };
//     randomize = () => {
//         if (!this.state.effect) {
//             const numberCopy = numbers.map((x) => x);
//             const arr = [];
//             for (let i = 0; i <= 7; i++) {
//                 const random = Math.floor(
//                     Math.random() * (numberCopy.length - 1)
//                 );
//                 arr.push(numberCopy[random] + 1);
//                 numberCopy.splice(random, 1);
//             }
//             this.setState({ number: arr, effect: true });
//             setTimeout(() => {
//                 this.setState({ effect: false });
//             }, 8000);
//         }
//     };
// }

module.exports = router;