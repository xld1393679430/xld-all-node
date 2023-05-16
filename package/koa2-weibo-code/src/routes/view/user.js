const Router = require('koa-router')
const router = new Router()

router.get('/get', async (ctx, next) => {
    await ctx.render('login', {})
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', {})
})

module.exports = router
