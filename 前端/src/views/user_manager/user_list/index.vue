<template>
	<breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
	<div class="table-wrapped">
		<!-- 顶部 -->
		<div class="table-top">
			<!-- 表格头部 -->
			<div class="table-header">
				<!-- 搜索框 -->
				<div class="left-wrapped">
					<div class="search-wrapped">
						<el-input
						  v-model="adminAccount"
						  style="width: 240px"
						  size="large"
						  placeholder="请输入"
						  :suffix-icon="Search"
						  @change="searchuser()"
						/>
					</div>
					<div class="select-wrapped">
						<el-select v-model="department" @change="searchForDepartment" placeholder="请选择部门筛选" clearable @clear="clearOperation">
							<el-option v-for="item in departmentData"  :key="item" :label="item" :value="item" />
						</el-select>
					</div>
				</div>
				<div class="button-wrapped">
					 <el-button type="primary" plain @click="banUserList">筛选冻结用户</el-button>
					 <el-button type="primary" plain @click="getFirstPageList">显示全部用户</el-button>

				</div>
			</div>
			<!-- 表格内容 -->
			<div class="table-content">
				 <el-table :data="tableData" style="width: 100%" border @row-dblclick='openUser'>
					<el-table-column type="index" width="50" />
				    <el-table-column prop="account" label="账号" />
				    <el-table-column prop="name" label="姓名"  />
					<el-table-column prop="sex" label="性别" />
				    <el-table-column prop="department" label="部门" />
					<el-table-column prop="email" label="邮箱"  />
					<el-table-column prop="status" label="状态">
						<template #default="{row}">
							<div>
								 <el-tag v-if="row.status==1">冻结</el-tag>
								  <el-tag  type="success" v-else>正常</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间"  >
						<template #default="{row}">
							<div>{{row.create_time?.slice(0,10)}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="update_time" label="更新时间"  >
						<template #default="{row}">
							<div>{{row.update_time?.slice(0,10)}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200">
					<template #default="{row}">
						<div>
							<el-button type="primary" @click="banuser(row.id)" :disabled='row.status==1'>冻结</el-button>
							<el-button type="success" @click="hotuser(row.id)" :disabled='row.status==0'>解冻</el-button>
						</div>
					</template>
					</el-table-column>
				  </el-table>
			</div>
		</div>
		<!-- 底部 -->
		<div class="table-footer">
			<el-pagination
			    :page-size="1"
				:pager-count="7" 
				:current-page="paginationData.currentPage"
				:page-count="paginationData.pageCount"
				@current-change="currentChange"
			    layout="prev, pager, next"
			    :total="adminTotal"
			  />
		</div>
	</div>
	<!-- <create ref="Create" @success="getAdminlist"></create>
	<edit ref="Edit" @success="getAdminlist"></edit>
	<deleteA ref="Delete" @success="getAdminlist"></deleteA> -->
	<userinfor ref="useri"></userinfor>
</template>

<script lang="ts" setup>
	import{searchUser,searchUserByDepartment,getAdminListLength,
	returnListData,getBanList,banUser,hotUser} from '@/api/userinfor.js'
	// import create from '../components/create_admin.vue'
	// import edit from '../components/edit_admin.vue'
	import userinfor from '../components/user_infor.vue'
	import breadCrumb from '@/components/bread_crumb.vue'
	import {ref,reactive,onMounted} from 'vue'
	import { Search } from '@element-plus/icons-vue'
	import { bus } from "@/utils/mitt.js"
	import {getDepartment} from '@/api/setting.js'
	import { ElMessage } from 'element-plus'
	
	// 表格内容
	const tableData=ref([
		{id:1,status:1}
	])
	
	// 面包屑
	const breadcrumb=ref<number>()
	// 面包屑参数
	const item=ref({
		first:'用户管理',
		second:'用户列表'
	})
	
	// 部门数据
	const departmentData=ref([])
	const getdepartment=async()=>{
		departmentData.value=await getDepartment()
	}
	getdepartment()
	
	
	
	// 搜索框的数据
	const adminAccount = ref('')
	// 通过账号进行搜索  搜索框
	const searchuser=async()=>{
		tableData.value=await searchUser(adminAccount.value)
	}

	
	// 通部门筛选  下拉框
	const department=ref()
	const searchForDepartment=async()=>{
		tableData.value=await searchUserByDepartment(department.value)
	}
	
	// 清空选择框
	const clearOperation=()=>{
		console.log('清空了');
		getFirstPageList()
	}
	
	// 分页数据
	const paginationData=reactive({
		// 总页数
		pageCount:1,
		// 当前所处页数
		currentPage:1
	})
	
	const adminTotal=ref<number>(0)
	// 获取用户数量
	const getAdminListlength=async()=>{
		const res=await getAdminListLength('用户')
		adminTotal.value=res.length
		console.log(res.length);
		paginationData.pageCount=Math.ceil(res.length/2)
		
	}
	getAdminListlength()
	
	// 默认获取第一页的数据
	const getFirstPageList=async()=>{
		console.log('0-0-0-0-0-0-0');
		tableData.value=await returnListData(1,'用户')
		console.log('-=-=-=-=');
	}
	getFirstPageList()
	
	// 监听换页
	const currentChange=async(value:number)=>{
		paginationData.currentPage = value;  // 更新当前页码
		tableData.value=await returnListData(paginationData.currentPage ,'用户')
	}
		
	// 获取用户列表
	// const getAdminlist=()=>{
	// 	getFirstPageList()
	// }
	// getAdminlist()
	
	// 筛选冻结用户
	const banUserList=async()=>{
		tableData.value=await getBanList()
	}
	
	// 冻结用户
	const banuser=async(id:number)=>{
		const res =await banUser(id)
		console.log(res);
		if(res.status===0){
			ElMessage({
			    message: '冻结用户成功',
			    type: 'success',
			  })
			 tableData.value=await returnListData(paginationData.currentPage,'用户')
			  
		}else{
			ElMessage.error('冻结用户失败')
		}
	}
	// 解冻用户
	const hotuser=async(id:number)=>{
		const res =await hotUser(id)
		if(res.status===0){
			ElMessage({
			    message: '解冻用户成功',
			    type: 'success',
			  })
			  tableData.value=await returnListData(paginationData.currentPage,'用户')
			  
		}else{
			ElMessage.error('解冻用户失败')
		}
	}
	
	const useri=ref()
	const openUser=(row:any)=>{
		bus.emit('userId',row)
		useri.value.open()
	}
	
	bus.on('offDialog',async(id:number)=>{
		// 当前的页数
		const current=paginationData.currentPage
		if(id){
			tableData.value=await returnListData(paginationData.currentPage,'用户')
			if(tableData.value.length==0){
				paginationData.currentPage=current-1
				getAdminListlength()	
			}
		}
	})
	
</script>

<style lang="scss" scoped>
	
	
</style>