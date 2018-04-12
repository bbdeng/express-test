// 1.安装 cnpm instlal cookie-parser --save
// 2.引入 var cookieParser = require('cookie-parser');
// 3.设置中间件
// app.use(cookieParser());
// 4.设置 cookie  第1个参数是cookie的名字 第2个是cookie的值 第3个是属性
// res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});
// HttpOnly 默认 false 不允许 客户端脚本访问
// 5.获取 cookie
// req.cookies.name
// 属性说明
// domain: 域名   例如：.aaa.com  多个2级域名共享cookie信息
// C:\Windows\System32\drivers\etc  下的hosts 设置本地的ip域名
// Expires： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday,
// res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly:true });
// maxAge： 最大失效时间（毫秒），设置在多少后失效
// secure： 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
// Path： 表示 在哪个路由下面可以访问cookie ，如 path=/。如果路径不能匹配时，浏览器则不发送这个 Cookie
// httpOnly：是微软对 COOKIE 做的扩展。如果在 COOKIE 中设置了“httpOnly”属性为true，则通过程序（JS脚本、applet 等）将无法读取到COOKIE 信息，防止 XSS 攻击产生
// singed：表示是否签名cookie, 设为true 会对这个 cookie 签名，这样就需要用res.signedCookies 而不是 res.cookies 访问它。被篡改的签名 cookie 会被服务器拒绝，并且 cookie值会重置为它的原始值
// 加密cookie
// 1.配置中间件的时候需要传参
// app.use(cookieParser('123456')); 123456其实可以随便传入
// 2. 设置 cookie  的时候配置 signed为true
// res.cookie('userinfo','hahaha',{domain:'.ccc.com',maxAge:900000,httpOnly:true,signed:true});
// 3.signedCookies  调用设置的 cookie
// console.log(req.signedCookies);

var express=require("express");
//引入cookie模块
var cookieParser=require("cookie-parser");



var app=new express();
//设置中间件
app.use(cookieParser("231561"));

app.get("/",function (req, res) {
    res.send("cookie首页!")
    console.log(req.signedCookies);
});

app.get("/set",function (req, res) {
    //设置cookie
    res.cookie("username","bbdeng",{maxAge:600000,httpOnly:true,signed:true});
    res.send("cookie设置成功！");
})

app.listen(8003,"localhost");
console.log("服务器启动成功！");
