const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const nodemailer = require('nodemailer');

//=================================
//             User
//=================================


router.get("/auth", auth, (req, res) => {
    //auth를 통과했다.( user와 token이 올바르다=로그인한 상태) 
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? true : false,
        /*0이면 선생님, 1이면 학생 */
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
    //회원가입시 현재 이게 불리는거임.
});


// router.post('/register_이메일보내지는거 확인함.', async(req, res, next) => {
//     const email = req.body.email;
//     const name = req.body.name;
//     const sId = req.body.sId;
//     const emailverify = req.body.emailverify;
//     const password = req.body.password;
//     const confirmpassword = req.body.confirmpassword;
//     const entryCode = req.body.entryCode;

//     console.log(req.body);

//     // 이미 가입된 이메일인지 확인
//     try {
//         const exUser = await User.findOne({ email: email }); // 이메일 중복 확인
//         if (exUser) {
//             console.log('이미 가입된 이메일입니다.');
//             res.send('email_error=exist');
//             // return res.status(403).send('error 설명 메시지');
//             next(error);
//         }

//         let authNum = Math.random().toString().substr(2, 6); //인증번호
//         let emailTemplete;
//         // ejs.renderFile(appDir + '/config/authemail.ejs', { authCode: authNum }, function(err, data) {
//         //     if (err) { console.log(err) }
//         //     emailTemplete = data;
//         // });
//         //transport는 메일을 보낼 객체이다.
//         let transporter = nodemailer.createTransport({
//             //service: 'Naver' _ 네이버는 전송이 안됨............
//             host: 'smtp.gmail.com', //호스트의 경우는 
//             port: 465, //네이버에서 확인가능함.
//             secure: true, // true for 465, false for other ports
//             auth: {
//                 user: "noino19990819@gmail.com", //메일 서버의 계정.
//                 pass: "Ro68523200!",
//             },
//         });
//         console.log(process.env.REACT_APP_NODEMAILER_USER);
//         let mailOptions = ({
//             from: 'Taxmate',
//             to: email,
//             subject: '회원가입을 위한 인증번호를 입력해주세요.',
//             html: "오른쪽 숫자 6자리를 입력해주세요 : " + authNum //emailTemplete,
//         });


//         transporter.sendMail(mailOptions, function(emailError, info) {
//             if (emailError) {
//                 console.log(emailError);
//                 console.log('메일 보내기 실패 in /email');
//                 next(emailError);
//             } else {
//                 console.log("Finish sending email : " + info.response);
//                 res.send(authNum); // 인증번호
//                 // res.redirect( path.join(__dirname, '/signup'));
//                 transporter.close();
//             }
//         });
//     } catch (error) {
//         return res.status(403).send('This account does not exist');
//         // return res.status(403).send('error 설명 메시지');
//     }
// });

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
        // 비밀번호 비교
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });
            // Token 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    //undefined로 에러나는 중 console.log(req.user._id)

    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

// router.post('/:id/', isLoggedIn, async (req, res, next) => {
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