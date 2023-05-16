const server = require('./server')

test('json接口返回数据格式正确', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'index title'
    })
    expect(res.body.title).toBe('index title')
})
