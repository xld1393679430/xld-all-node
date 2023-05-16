const sequelize = require('./sequelize')
require('./model/index')

sequelize.authenticate().then(() => {
    console.log('链接成功');
}).catch(err => {
    console.log(err, 'err')
})

sequelize.sync({force: true}).then(() => {
    console.log('sync ok')
    process.exit()
})
