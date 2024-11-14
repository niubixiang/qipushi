<template>
	<breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
	<!-- wrapper -->
	<div class="module-common-wrapped">
		<div class="module-commmon-content">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			    <el-tab-pane label="产品列表" name="first">
					<div class="pane-content">
						<div class="pane-top">
							<div class="module-commmon-header">
								<div class="search-wrapped">
									<el-input
									  v-model="productId"
									  style="width: 240px"
									  size="large"
									  placeholder="输入入库编号进行搜索"
									  :suffix-icon="Search"
									  @change="searchProduct"
									  clearable  
									  @clear="getProductFirstPageList"
									/>
								</div>
								
								<div class="button-wrapped">
									 <el-button type="primary" @click="productInWareHouse">产品入库</el-button>
								</div>
							</div> 
							<!-- 表格部分 -->
							<div class="module-commmon-table">
								<el-table :data="tableData" border style="width: 100%">
									<el-table-column type="index" width="50"></el-table-column>
								    <el-table-column prop="product_id" label="入库编号" width="200" />
								    <el-table-column prop="product_name" label="产品名称" width="160" />
								    <el-table-column prop="product_category" label="产品类别" width="100"/>
									<el-table-column prop="product_unit" label="单位" width="180" />
									<el-table-column prop="product_inwarehouse_number" label="库存数量" width="100" />
									<el-table-column prop="product_single_price" label="产品单价" width="150"/>
									<el-table-column prop="product_all_price" label="库存总价" width="100" />
									<el-table-column prop="product_status" label="库存状态" width="100">
										<template #default="{row}">
											<el-tag class="ml-2" type="success"
												v-if="row.product_inwarehouse_number<100">库存较少</el-tag>
											<el-tag class="ml-2" type="success"
												v-else-if="row.product_inwarehouse_number>=100&&row.product_inwarehouse_number<=300">库存正常</el-tag>
											<el-tag class="ml-2" type="success"
												v-else-if="row.product_inwarehouse_number>300">库存过剩</el-tag>
										</template>
									</el-table-column>
									<el-table-column prop="product_create_person" label="入库负责人" width="100" />
									<el-table-column prop="product_create_time" label="入库时间" width="200">
										<template #default="{row}">
											<div>{{row.product_create_time?.slice(0,10)}}</div>
										</template>
									</el-table-column>
									<el-table-column prop="product_update_time" label="最后修改时间" width="200">
										<template #default="{row}">
											<div>{{row.product_update_time?.slice(0,10)}}</div>
										</template>
									</el-table-column>
									<el-table-column prop="in_memo" label="入库备注" width="200"/>
									<el-table-column label="操作" width="300" fixed="right">
										<template #default="{row}">
											<div>
											    <el-button type="primary" @click="applyOut(row)"
												 :disabled='row.product_out_status=="申请出库" || row.product_inwarehouse_number==0'
												 >申请出库</el-button>
												<el-button type="success" @click="editProduct(row)">修改</el-button>
												<el-button type="danger" @click="deleteProduct(row.id)">删除</el-button>
											</div>
										</template>
									</el-table-column>
								  </el-table>
							</div>
						</div>
						<div class="table-footer">
							 <el-pagination
							     :page-size="1"
							 	:pager-count="7" 
							 	:current-page="paginationData.productCurrentPage"
							 	:page-count="paginationData.productpageCount"
							 	@current-change="productcurrentChange"
							     layout="prev, pager, next"
							     :total="paginationData.productTotal"
							   />
						</div>
					</div>
				</el-tab-pane>
			    <el-tab-pane label="审核列表" name="second">
					<div class="pane-content">
						<div class="pane-top">
							<div class="module-commmon-header">
								<div class="search-wrapped"><el-input
								  v-model="productOutId"
								  style="width: 240px"
								  size="large"
								  placeholder="输入出库申请编号进行搜索"
								  :suffix-icon="Search"
								  @change="searchApplyProduct"
								  clearable
								  @clear="getApplyProductFirstPageList"
								/></div>
								
								<div class="button-wrapped">
								</div>
							</div>
							<!-- 表格部分 -->
							<div class="module-commmon-table">
								<el-table :data="applyTableData" border style="width: 100%">
									<el-table-column type="index" width="50"></el-table-column>
									<el-table-column prop="product_out_id" label="申请出库编号" width="200" />
									<el-table-column prop="product_name" label="产品名称" width="200" />
									<el-table-column prop="product_out_number" label="申请出库数量" width="180" />
									<el-table-column prop="product_out_price" label="申请出库总价" width="180" />
									<el-table-column prop="product_out_apply_person" label="申请人" width="100" />
									<el-table-column prop="product_apply_date" label="申请出库时间" width="180">
										<template #default="{row}">
											<div>{{row.product_apply_date?.slice(0,10)}}</div>
										</template>
									</el-table-column>
									<el-table-column prop="product_out_audit_person" label="审核人" width="150" />
									<el-table-column prop="product_audit_time" label="审核时间" width="180">
										<template #default="{row}">
											<div>{{row.product_audit_time?.slice(0,10)}}</div>
										</template>
									</el-table-column>
									<el-table-column prop="product_out_status" label="审核状态" width="100" />
									<el-table-column prop="apply_memo" label="申请出库备注" width="200" />
									<el-table-column prop="audit_memo" label="审核备注" width="200" />
									<el-table-column label="操作" width="300" fixed="right">
										<template #default="{row}">
											<div>
												<el-button type="primary" @click="withdrawProduct(row.id)">撤回申请</el-button>
												<el-button type="success" @click="aginApply(row)" :disabled='row.product_out_status=="申请出库"'>再次申请</el-button>
												<el-button type="danger" @click="auditProduct(row)">审核</el-button>
											</div>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</div>
						<div class="table-footer">
							<el-pagination
							    :page-size="1"
								:pager-count="7" 
								:current-page="paginationData.applyProductCurrentPage"
								:page-count="paginationData.applyProductCount"
								@current-change="applyproductcurrentChange"
							    layout="prev, pager, next"
							    :total="paginationData.applyProductTotal"
							  />
						</div>
					</div>
				</el-tab-pane>
			  </el-tabs>
		</div>
	</div>
	<!-- 入库操作影响产品列表 -->
	<inwarehouse ref="inware" @success="getProductFirstPageList"></inwarehouse>
	<!-- 申请操作影响审核列表 -->
	<apply ref="applyP" @success="changeTwoPageList"></apply>
	<!-- 编辑操作影响产品列表 -->
	<edit ref="editP" @success="getProductFirstPageList"></edit>
	<!-- 删除操作影响产品列表 -->
	<deleteP ref="deletep"@success="getProductFirstPageList"></deleteP>
	<!-- 撤回操作影响产品列表、审核列表 -->
	<withdraw ref="withdrawP"@success="changeTwoPageList"></withdraw>
	<!-- 审核操作影响产品列表、审核列表 -->
	<audit ref="auditP" @success="changeTwoPageList"></audit>
	<!-- 再次申请影响审核列表 -->
	<agin ref="aginP" @success="getApplyProductFirstPageList"></agin>
</template>

<script lang="ts" setup>
	import {getProductList,searchProductForId,searchProductForApplyId,
	applyProductList,getProductLength,getApplyProductLength,returnProductListData,returnApplyProductListData} from '@/api/product.js'
	import {ref,reactive} from 'vue'
	import breadCrumb from '@/components/bread_crumb.vue'
	import { Search } from '@element-plus/icons-vue'
	import inwarehouse from '../components/product_in_warehouse.vue'
	import apply from '../components/apply.vue'
	import { bus } from "@/utils/mitt.js"
	import edit from '../components/edit_product.vue'
	import deleteP from '../components/delete_product.vue'
	import audit from '../components/audit.vue' 
	import withdraw from '../components/withdraw.vue'
	import agin from  '../components/agin_apply.vue'
	import type { TabsPaneContext } from 'element-plus'
	
	// 面包屑
	const breadcrumb=ref()
	// 面包屑参数
	const item=ref({
		first:'系统设置',
		second:'产品列表'
	})
	const activeName = ref('first')
	
	const handleClick = (tab: TabsPaneContext) => {
		if (tab.props.label == '产品列表') {
			getProductFirstPageList()
		}
		if (tab.props.label == '审核列表') {
			getApplyProductFirstPageList()
		}
	}
	
	// 产品入库编号
	const productId=ref<number>()
	// 产品申请出库编号
	const productOutId=ref<number>()

    // 产品入库表格
    const tableData=ref([]) 
    // 产品申请出库表格
    const applyTableData=ref([])

    // 分页数据
    const paginationData=reactive({
		// 产品总数
		productTotal:0,
    	// 产品列表总页数
    	productpageCount:0,
    	// 产品列表当前所处页数
    	productCurrentPage:1,
		//----------------------------------
		// 申请总数
		applyProductTotal:0,
		// 申请列表总页数
		applyProductCount:0,
		// 申请列表当前所处页数
		applyProductCurrentPage:1,
    })
    // 获取产品列表页数
    const getProductListlength=async()=>{
    	const res=await getProductLength()
    	paginationData.productTotal=res.length
		console.log('=======');
		console.log(paginationData.productTotal);
		console.log('=======');
    	console.log(res.length);
		console.log('-----------------90');
    	// 计算总页数每页10条数据
    	paginationData.productpageCount=Math.ceil(res.length/10)
    }
    getProductListlength()
	
	//----------------------------------------------------
    // 获取申请列表页数
    const getApplyProductListlength=async()=>{
    	const res=await getApplyProductLength()
    	paginationData.applyProductTotal=res.length
    	console.log(res.length);
    	// 计算总页数每页10条数据
    	paginationData.applyProductCount=Math.ceil(res.length/10)
    }
    getApplyProductListlength()
	
	
    // 默认获取产品列表第一页的数据
    const getProductFirstPageList=async()=>{
    	tableData.value=await returnProductListData(1)
    }
    getProductFirstPageList()
	//------------------------------------------
	// 默认获取申请列表第一页的数据
	const getApplyProductFirstPageList=async()=>{
		tableData.value=await returnApplyProductListData(1)
	}
	getApplyProductFirstPageList()
    
	// 更新产品列表及申请列表的第一页数据
	const changeTwoPageList=()=>{
		getProductFirstPageList()
		getApplyProductFirstPageList()
	}
	
    // 产品列表监听换页
    const productcurrentChange=async(value:number)=>{
    	paginationData.productCurrentPage = value;  // 更新当前页码
    	tableData.value=await returnProductListData(paginationData.productCurrentPage)
    }
	// 申请列表监听换页
	const applyproductcurrentChange=async(value:number)=>{
		paginationData.applyProductCurrentPage = value;  // 更新当前页码
		applyTableData.value=await returnApplyProductListData(paginationData.applyProductCurrentPage)
	}
	
	
	// // 获取产品列表
	// const getProductlist=async()=>{
	// 	tableData.value=await getProductList()
	// }
	// getProductlist()
	
	// // 获取产品审核列表
	// const getApplyProductList=async()=>{
	// 	applyTableData.value=await applyProductList()
	// }
	// getApplyProductList()
	
	// const changeProductlist=async()=>{
	// 	getProductlist()
	// 	getApplyProductList()
	// }
	// 通过产品入库id去搜索
	const searchProduct=async()=>{
		tableData.value=await searchProductForId(productId.value)
	}
	// 通过产品出库id去搜索
	const searchApplyProduct=async()=>{
		applyTableData.value=await searchProductForApplyId(productOutId.value)
	}
	// 打开添加产品入库弹窗
	const inware=ref()
	const productInWareHouse=()=>{
		inware.value.open()
	}
	// 打开产品申请出库弹窗
	const applyP=ref()
	const applyOut=(row:any)=>{
		bus.emit('applyId',row)
		applyP.value.open()
	}
	
	// 编辑产品信息
	const editP=ref()
	const editProduct=(row:any)=>{
		bus.emit('editProductId',row)
		editP.value.open()
	}
	
	// 删除产品信息
	const deletep=ref()
	const deleteProduct=(id:number)=>{
		bus.emit('deleteproductId',id)
		deletep.value.open()
	}
	
	
	// 审核产品
	const auditP=ref()
	const auditProduct=(row:any)=>{
		bus.emit('auditproductId',row)
		auditP.value.open()
	}
	
	
    // 撤回产品申请
	const withdrawP=ref()
	const withdrawProduct=(id:number)=>{
		bus.emit('withdrawId',id)
		withdrawP.value.open()
	}
	// 再次申请产品出库
	const aginP=ref()
	const aginApply=(row:any)=>{
		bus.emit('againId',row)
		aginP.value.open()
	}

</script>

<style lang="scss" scoped>
	
	
	:deep(.el-table .cell){
		font-weight: 400;
	}
</style>