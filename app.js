//引入express
var express=require("express");

//实例化
var app=new express();

//创建静态路由get路由
app.get("/" ,function (req,res) {
    res.send("express创建的静态路由！");
})
app.get("/login",function (req,res) {
    res.send("登陆！");

})
app.get("/register",function (req,res) {
    res.send("注册！");

})
//创建动态路由

//    http://localhost:8001/newscontent/541
app.get("/newscontent/:aid",function (req, res) {
    //获取动态路由的get传值
    console.log(req.params);
    var aid=req.params.aid;
    res.send("新闻模块！"+aid);


})

//      http://localhost:8001/product?aid=123&cid=324
app.get("/product",function (req, res) {
    //获取静态get传值
    console.log(req.query);
    res.send("product!");

})

//监听端口
app.listen(8001 ,"localhost");
console.log("服务器开启成功！");