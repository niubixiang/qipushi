<template>
	 <div class="common-layout">
	    <el-container>
	      <el-aside width="200px">
			<el-menu class="el-menu-vertical-demo" router>
				<div class="title">通用后台管理系统</div>
			  <el-menu-item index="home">
			
				<el-icon><House /></el-icon>
				<span>首页</span>
			  </el-menu-item>
			  <el-menu-item index="overview">
				<el-icon><Document /></el-icon>
				<span>系统概况</span>
			  </el-menu-item>
			  
			   <el-sub-menu index="3">
			            <template #title>
			              <el-icon><User /></el-icon>
			              <span>用户管理</span>
			            </template>
			            <el-menu-item-group title="管理员管理">
			              <el-menu-item index="product_manage">产品管理员</el-menu-item>
			              <el-menu-item index="users_manager">用户管理员</el-menu-item>
			              <el-menu-item index="message_manage">消息管理员</el-menu-item>
			            </el-menu-item-group>
			            <el-menu-item-group title="员工管理">
			              <el-menu-item index="user_list">用户列表</el-menu-item>
			            </el-menu-item-group>
			    </el-sub-menu>
				
				
				<el-sub-menu index="4">
				         <template #title>
				           <el-icon><TakeawayBox /></el-icon>
				           <span>产品管理</span>
				         </template>
				         <el-menu-item-group title="入库管理">
				           <el-menu-item index="product_manage_list">产品列表</el-menu-item>
				         </el-menu-item-group>
				         <el-menu-item-group title="出库管理">
				           <el-menu-item index="out_product_manager_list">出库列表</el-menu-item>
				         </el-menu-item-group>
				 </el-sub-menu>
				 
				 
				 <el-sub-menu index="5">
				          <template #title>
				            <el-icon><ChatSquare /></el-icon>
				            <span>消息管理</span>
				          </template>
				          <el-menu-item-group title="消息管理">
				            <el-menu-item index="message_list">消息列表</el-menu-item>
				          </el-menu-item-group>
				          <el-menu-item-group title="回收站">
				            <el-menu-item index="recycle">回收站</el-menu-item>
				          </el-menu-item-group>
				  </el-sub-menu>
			  
			  <el-menu-item index="file">
				<el-icon><icon-menu /></el-icon>
				<span>合同管理</span>
			  </el-menu-item>
			  <el-menu-item index="operation_log">
				<el-icon><icon-menu /></el-icon>
				<span>操作日志</span>
			  </el-menu-item>
			  <el-menu-item index="login_log">
				<el-icon><icon-menu /></el-icon>
				<span>登录日志</span>
			  </el-menu-item>
			  <el-menu-item index="set">
				<el-icon><Tools /></el-icon>
				<span>系统设置</span>
			  </el-menu-item>
			</el-menu>
		  </el-aside>
	      <el-container>
	        <el-header>
				<span class="header-left-content">尊敬的 {{userStore.name}} 欢迎您登录本系统</span>
				<div class="header-right-content">
					 <el-badge :is-dot="noread" class="item" @click="openDepartmentMessage">
					   <el-icon :size="20"><Message /></el-icon>
					  </el-badge>
					
					<!-- 头像 -->
					 <el-avatar :size="24" :src="userStore.imageUrl" />
					 <!-- 下拉菜单 -->
					   <el-dropdown>
					     <span class="el-dropdown-link">
					      设置
					     </span>
					     <template #dropdown>
					       <el-dropdown-menu>
					         <el-dropdown-item>设置账号</el-dropdown-item>
					         <el-dropdown-item>更改头像</el-dropdown-item>
					         <el-dropdown-item @click='goLogin'>退出登录</el-dropdown-item>
					        
					       </el-dropdown-menu>
					     </template>
					   </el-dropdown>
				</div>
			</el-header>
	        <el-main>
				<router-view></router-view>
			</el-main>
	      </el-container>
	    </el-container>
	  </div>
	  <departmentMsg ref="department_msg" ></departmentMsg>
</template>

<script lang="ts" setup>
	import departmentMsg from '@/components/department_message.vue'
    import {useRouter} from 'vue-router'
	import {useUserInfor} from '@/store/userinfor.js'
	import {
	  Menu as IconMenu
	} from '@element-plus/icons-vue'
	import { reactive, toRefs,ref } from 'vue'
	
	
	const userStore=useUserInfor()
	userStore.userInfor(localStorage.getItem('id'))
	
	const router=useRouter()
	
	const goLogin=()=>{
		router.push('/login')
	}
	const department_msg = ref()
	const openDepartmentMessage = () => {
		department_msg.value.open()
	}
</script>

<style lang="scss" scoped> 
.el-aside{
	height:100vh;
	background-color: #2a303a;
	width: 210px;
	overflow-x: hidden;
	.el-menu{
		background-color: #2a303a;
		width: 210px;
		height:100vh;
		border-right: 0px;
		
	}
	.title{
		padding:20px;
		display: flex;
		justify-content: center;
		color:#fff;
		background-color: #2a303a;
	}
	.el-menu-item{
		color:#fff
	}
	
}
.el-header{
	display:flex;
	align-items:center;
	justify-content: space-between;
	height:55px;
	color:#c1c6c8;
	background-color: #262f3e;
	.header-left-content{
		font-size: 14px
	}
	.header-right-content{
		display: flex;
		justify-content: space-around;
		align-items: center;
		width:160px
	}
}

.el-main{
	--el-main-padding:0;
	background-color: #f3f4fa;
}

// 无子菜单
.el-menu-item:hover{
	background-color: #006dff;
}
// 有子菜单
:deep(.el-sub-menu__title:hover){
	background-color:  #006dff;
}

:deep(.el-sub-menu__title)
{
		color:#fff
	}
	
:deep(.el-menu--inline){
	background-color: #2a303a;
}
</style>