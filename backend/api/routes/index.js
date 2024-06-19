const router = require('express').Router()
const userRouter = require('./user.router')
const product_cardsRouter= require('./product_cards.router')
const orderRouter= require('./orders.router')
/*
router.get('/u', (req,res) => {
    res.status(200).send('Express working')
  })
  */

router.use('/user',userRouter)
router.use('/product-cards',product_cardsRouter)
router.use('/order',orderRouter)

module.exports = router