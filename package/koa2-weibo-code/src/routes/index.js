const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json_session', async(ctx, next) => {
  const session = ctx.session
  console.log(session);
  if (session.viewNum == null) {
    session.viewNum = 1
  } else {
    session.viewNum++
  }

  ctx.body = {
    viewNum: session.viewNum
  }
})

router.get('/json', async(ctx, next) => {
  ctx.body = {
    title: 'index title'
  }
})

module.exports = router
