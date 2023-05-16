const jsonwebtoken = require('jsonwebtoken')
const { SECRET } = require('../constant')
const util = require('util')

const Router = require('koa-router')

const router = new Router()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


const USER = {
  username: 'admin',
  password: '123456',
  id: 100
}


router.post('/login', async (ctx, next) => {
  // 登录 判断用户名密码是否匹配
  const { username, password } = ctx.request.body
  let checkUser = username == USER.username && password == USER.password;
  if (checkUser) {
    ctx.body = {
      code: 200,
      msg: '登录成功',
      token: jsonwebtoken.sign(
          {
            name: USER.username,
            id: USER.id
          },
          SECRET,
          { expiresIn: '1h' }
      )
    }
  } else {
    // 登录失败, 用户名密码不正确
    ctx.body = {
      code: 400,
      msg: '用户名密码不匹配'
    }
  }
})

router.get('/userinfo', async (ctx, next) => {
  // 获取用户信息 中间件统一验证token
  let token = ctx.header.authorization;
  let payload = await util.promisify(jsonwebtoken.verify)(token.split(' ')[1], SECRET);
  ctx.body = {
    code: 200,
    data: payload,
    msg: '请求成功'
  }
})

module.exports = router
