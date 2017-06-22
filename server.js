var connect=require('connect');
var server_static=require('serve-static');
var app=connect();

app.use(server_static("../NEW_PROJECT"));
app.listen(5000);
console.log("开始监听5000");

