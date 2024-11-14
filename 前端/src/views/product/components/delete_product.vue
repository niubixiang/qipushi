<template>
	<el-dialog v-model="dialogFormVisible" title="删除产品" width="30%" center>
		<span>请慎重操作，删除后将失去此产品的记录</span>
		<!-- 底部内容 -->
		<template #footer>
		  <span class="dialog-footer">
			<el-button type="primary" @click="deleteproduct" >
			  确定
			</el-button>
		  </span>
		</template>
	  </el-dialog>
</template>

<script lang="ts" setup>
	import { ElMessage } from 'element-plus'
	import {getUserInfor,editAdmin,changeIdentityToUser,deleteUser} from '@/api/userinfor.js'
	import { bus } from "@/utils/mitt.js"
	import { reactive, ref,onBeforeUnmount } from 'vue'
	import {deleteProduct} from '@/api/product.js'
	const productid=ref()
	bus.on('deleteproductId',(id:number)=>{
		productid.value=id
		
	})
	const emit=defineEmits(['success'])
	const deleteproduct=async()=>{
			const res=await deleteProduct(productid.value)
			if(res.status===0){
				ElMessage({
				    message: '删除产品成功',
				    type: 'success',
				  })
				  emit('success')
				  dialogFormVisible.value=false
			}else{
				ElMessage.error('删除产品失败')
			}
	}
	
	
	// 弹窗开关  编辑管理员
    const dialogFormVisible = ref(false)
	const open=()=>{
		dialogFormVisible.value=true
	}
	defineExpose({
		open
	})
	
	onBeforeUnmount(()=>{
		bus.all.clear()
	})
</script>

<style lang="scss" scoped>
	
</style>