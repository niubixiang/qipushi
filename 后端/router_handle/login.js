const db=require('../db/index.js')
// 导入bcrypt加密中间件
const bcrypt=require('bcryptjs')
// 导入jwt,用于生token
const jwt=require('jsonwebtoken')
// 导入jwt配置文件,用于加密跟解密
const jwtconfig=require('../jwt_config/index.js')

exports.register=(req,res)=>{
	// req是前端传过来的数据,res是返回给前端的数据
	const reginfo=req.body
	console.log('--------------------------');
	console.log(reginfo);
	// 第一步:判断前端传来的数据有没有为空
	if(!reginfo.account || !reginfo.password){
		return res.send({
			status:1,
			message:'账号或者密码不能为空'
		})
	}
	// 第二步判断前端传过来账号有没有已经存在在数据库中
	// 需要使用mysql的select语句
	const sql='select * from users where account = ?'
	db.query(sql,reginfo.account,(err,results)=>{
		console.log('00000000');
		console.log(results);
		if(results.length >0){
			return res.send({
				status:1,
				message:'该账号已存在'
			})
		}
		// 第三步,对密码进行加密，使用加密中间件bcrypt.js
		reginfo.password=bcrypt.hashSync(reginfo.password,10)
		// 第四步，把账号跟密码插入到users表中
		const sql1='insert into users set ?'
		// 注册身份
		const identity='用户'
		// 创建时间
		const create_time=new Date()
		db.query(sql1,{
			account:reginfo.account,
			password:reginfo.password,
			// 身份
			identity,
			// 创建时间
			create_time,
			// 初始未冻结状态为0
			status:0
		},(err,results)=>{
			// 插入失败
			if(results.affectedRows !==1){
				return res.send({
					status:1,
					message:'注册账号失败'
				})
			}
			res.send({
				status:1,
				message:'注册账号成功'
			})
		})
		
		
	})
}

exports.login=(req,res)=>{
	const loginfo=req.body
	// 第一步,查看数据表中有没有前端传过来的账号
	const sql='select * from users where account=?'
	db.query(sql,loginfo.account,(err,results)=>{
		// 执行sql语句失败的情况,一般在数据库断开的情况会执行失败
		if(err) return res.cc(err)
		if(results.length!==1) return res.cc('登录失败1')
		// 第二步,对前端传来的密码进行解密
		const compareResult=bcrypt.compareSync(loginfo.password,results[0].password)
		if(!compareResult){
			return res.cc('登录失败2')
		}
		// 第三步,对账号是否冻结做判定
		if(results[0].status==1){
			return res.cc('账号被冻结')
		}
		// 第四步,生成返回给前端的token
		// 剔除加密后的密码,头像,创建时间,更新时间
		const user={
			...results[0],
			password:'',
			imageUrl:'',
			create_time:'',
			update_time:''
		}
		// 设置token的有效时长   有效期为7个小时
		const tokenStr=jwt.sign(user,jwtconfig.jwtSecretKey,{
			expiresIn:'7h'
		})
		res.send({
			results:results[0],
			status:0,
			message:'登录成功',
			token:'Bearer '+tokenStr
		})
	})
}



