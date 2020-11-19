
module.exports = function (app, mailTransport) {
  app.post('/success-registeration', async function (req, res, next) {
    mailTransport.sendMail({
      from: '"KAPECOM CONNECT" <info@kapecom.ddhub.org.ng>',
      to: req.body.to,
      subject: 'Congratulations !',
      text: 'Your account has been successfully created and activated. Quickly login and get your staffs live.'
    }, function (error) {
      if (error) {
        res.status(203).send({ error, message: 'Error : Unable to send email' })
      } else {
        res.status(200).send({ message: 'Message sent successfully !' })
      }
    })
  })

  app.get('/changepassword', function (req, res, next) {
    res.render('change.pug')
  })

  app.post('/resetpassword', function (req, res, next) {

  })
}
