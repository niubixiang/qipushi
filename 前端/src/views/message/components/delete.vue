<template>
	<el-dialog v-model="dialogFormVisible" :title='title' width="30%" center>
		<span v-if="title=='删除信息'">您确定要删除这个公告吗？</span>
		<span v-else-if="title=='恢复消息'">您确定要恢复这个公告吗？</span>
		<span v-else>请慎重操作！您确定要真正删除这个公告吗？</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary"@click="operationMessage">
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
	import {firstDelete,recover,deleteMessage} from '@/api/message.js'
	const title=ref()
	// 消息id
	const messageid=ref()
	
	bus.on('deleteMessageId',(id:number)=>{
		title.value="删除信息"
		messageid.value=id
		
	})
	bus.on('renewID',(id:number)=>{
		title.value="恢复信息"
		messageid.value=id
		
	})
	bus.on('realDelete',(id:number)=>{
		title.value="真正删除信息"
		messageid.value=id
		
	})
	const emit=defineEmits(['success'])
	const operationMessage=async()=>{
		if(title.value=='删除信息'){
			const res=await firstDelete(messageid.value)
			if(res.status===0){
				ElMessage({
				    message: '删除公共成功',
				    type: 'success',
				  })
				  emit('success')
				  dialogFormVisible.value=false
			}else{
				ElMessage.error('删除公共失败')
			}
		}
		if(title.value=='恢复信息'){
			const res=await recover(messageid.value)
			if(res.status===0){
				ElMessage({
				    message: '恢复公共成功',
				    type: 'success',
				  })
				  emit('success')
				  dialogFormVisible.value=false
			}else{
				ElMessage.error('恢复公共失败')
			}
		}
		if(title.value=='真正删除信息'){
			const res=await deleteMessage(messageid.value)
			if(res.status===0){
				ElMessage({
				    message: '真正删除公共成功',
				    type: 'success',
				  })
				  emit('success')
				  dialogFormVisible.value=false
			}else{
				ElMessage.error('真正删除公共失败')
			}
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