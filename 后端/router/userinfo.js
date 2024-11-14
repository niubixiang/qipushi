// 导入express框架
const express=require('express')
// 使用express框架的路由
const router=express.Router()
// 导入login的路由处理模块
const userinfoHandler=require('../router_handle/userinfo.js')
// 导入expressjoi
// expressJoi: 导入 express-joi 中间件，它允许你将 Joi 验证规则应用于 Express 路由。
const expressJoi=require('@escook/express-joi')
// 导入验证规则
const {name_limit,email_limit,password_limit,forgetPassword_limit}=require('../limit/user.js')


// 上传头像
router.post('/uploadAvatar',userinfoHandler.uploadAvatar)

// 绑定账号
router.post('/bindAccount',userinfoHandler.bindAccount)

// 修改用户密码
router.post('/changePassword',expressJoi(password_limit),userinfoHandler.changePassword)

// 获取用户信息
router.post('/getUserInfo',userinfoHandler.getUserInfo)

// 修改姓名
router.post('/changeName',expressJoi(name_limit),userinfoHandler.changeName)

// 修改性别
router.post('/changeSex',userinfoHandler.changeSex)

// 修改邮箱
router.post('/changeEmail',expressJoi(email_limit),userinfoHandler.changeEmail)

// 验证账号与邮箱是否一致
router.post('/verifyAccountAndEmail',userinfoHandler.verifyAccountAndEmail)

// 登录页面修改密码
router.post('/changePasswordInLogin',expressJoi(forgetPassword_limit),userinfoHandler.changePasswordInLogin)


// 用户管理-------------------------------------
// 添加管理员
router.post('/createAdmin',userinfoHandler.createAdmin)

// 获取管理员列表
router.post('/getAdminList',userinfoHandler.getAdminList)
// 编辑管理员账号信息
router.post('/editAdmin',userinfoHandler.editAdmin)

// 对管理员取消赋权
router.post('/changeIdentityToUser',userinfoHandler.changeIdentityToUser)

// 对用户进行赋权 
router.post('/changeIdentityToAdmin',userinfoHandler.changeIdentityToAdmin)

// 通过账号对用户进行搜索
router.post('/searchUser',userinfoHandler.searchUser)
// 冻结用户
router.post('/banUser',userinfoHandler.banUser)
// 解冻用户
router.post('/hotUser',userinfoHandler.hotUser)

// 获取冻结用户列表
router.post('/getBanList',userinfoHandler.getBanList)

// 删除用户  id
router.post('/deleteUser',userinfoHandler.deleteUser)

// 通过部门对用户搜索
router.post('/searchUserByDepartment',userinfoHandler.searchUserByDepartment)

// 获取对应身份的一个总人数 
router.post('/getAdminListLength',userinfoHandler.getAdminListLength)

// 监听换页返回数据 
router.post('/returnListData',userinfoHandler.returnListData)

// 向外暴露路由
module.exports=router