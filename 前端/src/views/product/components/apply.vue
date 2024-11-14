<template>
	<el-dialog v-model="dialogFormVisible" title="添加产品入库" width="600" align-center draggable>
		<div class="product-name">您申请出库的产品是:&nbsp;&nbsp;{{formData.product_name}}</div>
		<div class="product-name">该产品的库存还有:&nbsp;&nbsp;{{formData.product_inwarehouse_number}}</div>
	    <div class="dialog-content">
			  <el-form ref="ruleFormRef" style="max-width: 600px" :model="formData" :rules="rules" label-width="120px"  
			   :label-position="labelPosition">
				 <el-form-item label="申请出库编号" prop="product_out_id">
					<el-input v-model="formData.product_out_id" />
				</el-form-item>
				<el-form-item label="出库数量" prop="product_out_number">
					<el-input v-model="formData.product_out_number" />
				</el-form-item>
				<el-form-item label="出库申请人" prop="product_out_apply_person">
					<el-input v-model="formData.product_out_apply_person" />
				</el-form-item>
				<el-form-item label="产品单价" prop="product_single_price">
					<el-input v-model="formData.product_single_price" disabled/>
				</el-form-item>
				<el-form-item label="申请出库备注" prop="apply_memo">
					<el-input v-model="formData.apply_memo" :rows="2" type="textarea" />
				</el-form-item>
			  </el-form>
		</div>
		<!-- 底部内容 -->
		<template #footer>
		  <span class="dialog-footer">
			<el-button type="primary" @click="addproduct" >
			  确定
			</el-button>
		  </span>
		</template>
	  </el-dialog>
</template>

<script lang="ts" setup>
	// import {getDepartment} from '@/api/setting.js'
	import { bus } from "@/utils/mitt.js"
	import {createProduct,applyOutProduct} from '@/api/product.js'
	import { ElMessage } from 'element-plus'
	import { reactive, ref } from 'vue'
	bus.on('applyId',(row:any)=>{
		formData.id = row.id
		formData.product_inwarehouse_number = row.product_inwarehouse_number
		formData.product_name = row.product_name
		formData.product_single_price = row.product_single_price
		// formData.product_out_number = ''
		// formData.product_out_id = ''
	})
	const labelPosition = ref('left')
	const title=ref()
	
	// 部门数据
	// const departmentData=ref([])
	// const getdepartment=async()=>{
	// 	departmentData.value=await getDepartment()
	
	// 	console.log(departmentData.value);
	// }
	// getdepartment()
	
	interface FormData {
		id : number,
		product_name: string,
		product_out_id : number,
		product_inwarehouse_number : number,
		product_single_price:number,
		product_out_number : number,
		product_out_apply_person : string,
		apply_memo : string,
	}

	const formData : FormData = reactive({
		id: null,
		product_name:null,
		product_out_id: null,
		product_inwarehouse_number:null,
		product_single_price:null,
		product_out_number: null,
		product_out_apply_person: null,
		apply_memo: ''
	})
	
	// 表单规则
	const rules = reactive({
		product_out_id: [
			{ required: true, message: '请输入申请出库编号', trigger: 'blur' },
		],
		product_out_number: [
			{ required: true, message: '请输入申请出库数量', trigger: 'blur' },
		],
		product_out_apply_person: [
			{ required: true, message: '请输入申请人', trigger: 'blur' },
		],
	})
	
	const emit=defineEmits(['success'])
    // 产品申请出库
	const addproduct=async()=>{
		const res=await applyOutProduct(formData)
		console.log(res);
		if(res.status===0){
			ElMessage({
			    message: '产品申请出库成功',
			    type: 'success',
			  })
			  emit('success')
			  // bus.emit('adminDialogOff',1)
			  dialogFormVisible.value=false
		}else{
			ElMessage.error('产品申请出库失败')
		}
	}
	
	// 弹窗开关  创建管理员
    const dialogFormVisible = ref(false)
	const open=()=>{
		dialogFormVisible.value=true
	}
	defineExpose({
		open
	})
	
</script>

<style lang="scss" scoped>
	.dialog-content{
		display: flex;
		padding:20px 30px;
	}
	.product-name{
		display:flex;
		justify-content: center;
		font-size:16px;
		color:#333;
		margin:10px;
	}
	:deep(.el-form-item){
		margin: 30px;
	}
</style>