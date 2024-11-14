<template>
	<breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
	<div class="table-wrapped">
		<!-- 顶部 -->
		<div class="table-top">
			<!-- 表格头部 -->
			<div class="table-header">
				<!-- 搜索框 -->
				<div class="search-wrapped">
					<el-input
					  v-model="adminAccount"
					  style="width: 240px"
					  size="large"
					  placeholder="输入账号进行搜索"
					  :suffix-icon="Search"
					   @change="searchAdmin()"
					/>
				</div>
				<div class="button-wrapped">
					 <el-button type="primary" @click="openCreate(3)">添加消息管理员</el-button>
				</div>
			</div>
			<!-- 表格内容 -->
			<div class="table-content">
				 <el-table :data="tableData" style="width: 100%">
					<el-table-column type="index" width="50" />
				    <el-table-column prop="account" label="账号" />
				    <el-table-column prop="name" label="姓名"  />
				    <el-table-column prop="department" label="部门" />
					<el-table-column prop="email" label="邮箱"  />
					<el-table-column label="操作">
					<template #default="{row}">
						<div>
							<el-button type="success" @click="openEdit(row.id)">编辑</el-button>
							<el-button type="danger" @click="openDelete(row.id)">删除</el-button>
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
	<create ref="Create"></create>
	<edit ref="Edit"></edit>
	<deleteA ref="Delete"></deleteA>
</template>

<script lang="ts" setup>
	import edit from '../components/edit_admin.vue'
	import deleteA from '../components/delete_admin.vue'
	import { bus } from "@/utils/mitt.js"
	import create from '../components/create_admin.vue'
	import breadCrumb from '@/components/bread_crumb.vue'
	import {ref,reactive,onMounted} from 'vue'
	import { Search } from '@element-plus/icons-vue'
	import{searchUser,getAdminListLength,returnListData} from '@/api/userinfor.js'
	const adminAccount = ref('')
	// 面包屑
	const breadcrumb=ref()
	// 面包屑参数
	const item=ref({
		first:'用户管理',
		second:'消息管理员'
	})

	// 表格内容
	const tableData=ref([
		{id:1}
	])
	// 搜索函数
	const searchAdmin=async()=>{
		tableData.value=await searchUser(adminAccount.value)
	}
	// 分页数据
	const paginationData=reactive({
		// 总页数
		pageCount:1,
		// 当前所处页数
		currentPage:1
	})
	
	const adminTotal=ref<number>(0)
	// 获取管理员数量
	const getAdminListlength=async()=>{
		const res=await getAdminListLength('消息管理员')
		adminTotal.value=res.length
		console.log(res.length);
		paginationData.pageCount=Math.ceil(res.length/2)
		
	}
	getAdminListlength()
	
	// 默认获取第一页的数据
	const getFirstPageList=async()=>{
		console.log('0-0-0-0-0-0-0');
		tableData.value=await returnListData(1,'消息管理员')
		console.log('-=-=-=-=');
	}
	getFirstPageList()
	
	// 监听换页
	const currentChange=async(value:number)=>{
		paginationData.currentPage = value;  // 更新当前页码
		tableData.value=await returnListData(paginationData.currentPage,'消息管理员')
	}
	
	bus.on('adminDialogOff',async(id:number)=>{
		// 当前的页数
		const current=paginationData.currentPage
		// 创建管理员
		if(id==1){
			getAdminListlength()
		}
		// 编辑管理员
		if(id==2){
			tableData.value=await returnListData(paginationData.currentPage,'产品管理员')
		}
		// 对管理员降职
		if(id==3){
			tableData.value=await returnListData(paginationData.currentPage,'产品管理员')
			if(tableData.value.length==0){
				paginationData.currentPage=current-1
				getAdminListlength()	
			}
		}
	})
	
	
	
	// 新建管理员
	const Create=ref()
	const openCreate=(id:number)=>{
		bus.emit('createId',id)
		Create.value.open()
	}
	
	// 编辑管理员
	const Edit=ref()
	const openEdit=(id:number)=>{
		bus.emit('editId',id)
		Edit.value.open()
	}
	
	// 降级管理员
	const Delete=ref()
	const openDelete=(id:number)=>{
		bus.emit('deleteId',id)
		Delete.value.open()
	}
	
</script>
<style lang="scss" scoped>
</style>