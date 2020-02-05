
const router = require('express').Router()
const passport = require('passport')
const { auth } = require('../../controllers')

router.get("/login", (req, res) => {
   res.send("please login")
})

router.post("/login", (req, res, next) => {
   req.body.username = JSON.stringify({
      $or: [{ userName: req.body.username },
      { email: req.body.username }]
   })
   passport.authenticate('local', {
      successRedirect: "/",
      failureRedirect: "/auth/login"
   })(req, res, next)
})

router.post("/register", auth.createUser)

module.exports = router