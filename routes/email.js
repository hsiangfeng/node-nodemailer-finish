var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/user', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/send', (req, res) => {
  const {
    refresh_token,
    access_token,
  } = req.session.tokens;
 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: '你的信箱',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: refresh_token,
      accessToken: access_token,
    },
  });

  const mailOptions = {
    from: '你的信箱',
    to: '你要發送的對象信箱',
    subject: '這是信件的主旨',
    text: '這是信件的內容',
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error sending email');
    } else {
      console.log(info);
      res.send('Email sent');
    }
  });
});

router.post('/server/send', async (req, res, next)=> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: '你要發送的對象信箱',
      subject: '這是信件的主旨',
      text: '這是信件的內容',
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error sending email');
      } else {
        console.log(info);
        res.send('Email sent');
      }
    });
});

module.exports = router;
