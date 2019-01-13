const Koa = require('koa')

var app = new Koa();

app.use(async(ctx,next)=>{
    ctx.response.body = "hello world"
})

app.listen(8080)

