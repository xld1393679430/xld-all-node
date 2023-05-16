const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const {SECRET} = require('./constant')
const {isProd} = require('../utils/env')
const index = require('./routes')
const users = require('./routes/users')
const errorViewRouter = require('./routes/error')
const {REDIS_CONF} = require('../conf/db')

const app = new Koa()

let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: '/error'
    }
}

// error handler
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

app.use(async (ctx, next) => {
    return next().catch(error => {
        if (error.status === 401) {
            ctx.status = 401
            ctx.body = {
                code: 401,
                mes: error.message
            }
        } else {
            throw error
        }
    })

})

//session配置
app.keys = ['UdfgdD#$%$#3']
app.use(session({
    key: 'weibo.sid',
    prefix: 'weibo:sess',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
    ttl: 24 * 60 * 60 * 1000,
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    }),
}))

// 设置不需要jwt的接口
app.use(koajwt({
    secret: SECRET
}).unless({
    path: [
        /^\/users\/login/,
        /^\/json/,
    ]
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
console.log('------start------')
module.exports = app
