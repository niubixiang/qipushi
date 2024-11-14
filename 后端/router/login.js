// 登录注册模块路由
// 导入express框架
const express=require('express')
// 使用express框架的路由
const router=express.Router()
// 导入login的路由处理模块
const loginHandler=require('../router_handle/login.js')
// 导入expressjoi
// expressJoi: 导入 express-joi 中间件，它允许你将 Joi 验证规则应用于 Express 路由。
const expressJoi=require('@escook/express-joi')
// 导入验证规则
const {login_limit}=require('../limit/login.js')
// 注册
// expressJoi(login_limit)：中间件会验证请求体（req.body）是否符合 login_limit 中定义的规则
router.post('/register',expressJoi(login_limit),loginHandler.register)
// 登录
router.post('/login',expressJoi(login_limit),loginHandler.login)

// 向外暴露路由
module.exports=router