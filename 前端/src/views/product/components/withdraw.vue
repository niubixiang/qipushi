<template>
	<el-dialog v-model="dialogFormVisible" title='撤回申请' width="30%" center>
		<span >确定取消此产品的出库申请吗？</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="removeProduct">
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
	import {withdrawApplyProduct} from '@/api/product.js'
	const withdrawid=ref()
	bus.on('withdrawId',(id:number)=>{
		withdrawid.value=id
		
	})
	const emit=defineEmits(['success'])
	const removeProduct=async()=>{
			const res=await withdrawApplyProduct(withdrawid.value)
			if(res.status===0){
				ElMessage({
				    message: '撤回申请成功',
				    type: 'success',
				  })
				  emit('success')
				  dialogFormVisible.value=false
			}else{
				ElMessage.error('撤回申请失败')
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