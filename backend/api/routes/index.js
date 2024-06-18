const router = require('express').Router()
const userRouter = require('./user.router')


/*
router.get('/u', (req,res) => {
    res.status(200).send('Express working')
  })
  */

router.use('/user',userRouter)

  module.exports = router