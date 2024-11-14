<template>
	
	<!-- 忘记密码 -->
	 <el-dialog
	    v-model="state.forgetPasswordDialog"
	    title="忘记密码"
	    width="400"
	  >
	  <el-form class="login-form" :label-position="labelPosition" :rules="rules">
	  	<el-form-item label="输入您的个人账号" prop="account">
	  	    <el-input v-model="forgetData.account" placeholder="输入您的个人账号" />
	  	</el-form-item>
	  	<el-form-item label="输入您的个人邮箱" prop="email">
	  	    <el-input v-model="forgetData.email" placeholder="输入您的个人邮箱" />
	  	</el-form-item>
	  </el-form>
	  <!-- 底部内容 -->
	  <template #footer>
	    <div class="dialog-footer">
	  	<el-button @click="state.forgetPasswordDialog = false">取消</el-button>
	  	<el-button type="primary" @click="verifyAccount">
	  	  下一步
	  	</el-button>
	    </div>
	  </template>
	  </el-dialog>
	  
	  
	  <!-- 修改密码 -->
	  <el-dialog
	     v-model="state.changePasswordDialog"
	     title="修改密码"
	     width="400"
	   >
	   <el-form class="login-form" :label-position="labelPosition" :rules="rules">
	   	<el-form-item label="输入您的新密码" prop="password">
	   	    <el-input v-model="forgetData.password" show-password placeholder="输入您的新密码" />
	   	</el-form-item>
	   	<el-form-item label="再次确认您的新密码" prop="repassword">
	   	    <el-input v-model="forgetData.repassword"  show-password placeholder="再次确认您的新密码" />
	   	</el-form-item>
	   </el-form>
	   <!-- 底部内容 -->
	   <template #footer>
	     <div class="dialog-footer">
	   	<el-button @click="state.changePasswordDialog = false">取消</el-button>
	   	<el-button  @click="resetPassword" type="primary"  >
	   	  确定
	   	</el-button>
	     </div>
	   </template>
	   </el-dialog>
</template>

<script lang="ts" setup>
	import { ref,reactive} from 'vue';
	import {verify,reset} from'@/api/login'
	import { ElMessage } from 'element-plus'
	
	const labelPosition = ref('top')

	
	// 表单对象接口
	interface forgetData{
		account:number;
		email:string;
		password:string;
		repassword:string;
	}
	
	// 表单对象
	const forgetData:forgetData=reactive({
		account:null,
		email:'',
		password:'',
		repassword:''
	})
	
	// 表单规则
	const rules = reactive({
		account: [
		    { required: true, message: '请输入您的注册账号', trigger: 'blur' },
		],
		email: [
		    { required: true, message: '请输入您的注册邮箱', trigger: 'blur' },
		],
		password: [
		    { required: true, message: '请输入您想修改的密码', trigger: 'blur' },
		],
		repassword: [
		    { required: true, message: '请再次确认您的新密码', trigger: 'blur' },
		],
	})
	
	
	
	// 控制弹窗默认关闭
	const state=reactive({
		forgetPasswordDialog:false,
		changePasswordDialog:false
	})
	
	// 打开验证账号和邮箱弹窗
	const verifyAccount=async()=>{
		const res=await verify(forgetData)
		if(res.status===0){
			ElMessage({
			    message: '验证成功',
			    type: 'success',
			  })
			  localStorage.setItem('id',res.id)
			state.forgetPasswordDialog=false
			state.changePasswordDialog=true
		}else{
			ElMessage.error('验证失败')
		}
		
		
	}
	
	// 重置密码
	const resetPassword=async()=>{
		if(forgetData.password===forgetData.repassword){
			const newPassword=forgetData.repassword
	        await reset(localStorage.getItem('id'),newPassword)
			ElMessage({
			    message: '修改成功',
			    type: 'success',
			  })
		}else{
			ElMessage.error('修改失败，请检查密码是否一致')
		}
	}
	
	// 打开弹窗
	const open=()=>{
		state.forgetPasswordDialog=true
	}
	
	defineExpose({
		open
	})
	
	
</script>

<style lang="scss" scoped>
</style>