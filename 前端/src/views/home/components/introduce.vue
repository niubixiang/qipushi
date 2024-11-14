<template>
	<el-dialog v-model="state.dialogFormVisible" :title="title" width="800px" destroy-on-close>
		<el-container>
			<el-main>
				<div class="content" v-html="valueHtml"></div>
			</el-main>
		</el-container>
	</el-dialog>
</template>


<script lang="ts" setup>
	
	import {
		onBeforeUnmount, ref,reactive
	} from 'vue'
	
	import { bus } from "@/utils/mitt.js"
	import { getCompanyIntroduce} from '@/api/setting'
	const title = ref()
	const valueHtml=ref()
	bus.on("introduce", async (id : number) => {
		if (id == 1) {
			title.value = '公司介绍'
			valueHtml.value = await getCompanyIntroduce('公司介绍')
		}
		if (id == 2) {
			title.value = '公司架构'
			valueHtml.value = await getCompanyIntroduce('公司架构')
		}
		if (id == 3) {
			title.value = '公司战略'
			valueHtml.value = await getCompanyIntroduce('公司战略')
		}
		if (id == 4) {
			title.value = '高层介绍'
			valueHtml.value = await getCompanyIntroduce('公司高层')
		}
	})
	
	const state = reactive({
		dialogFormVisible: false,
	});

	// 取消删除
	const cancel = () => {
		ElMessage.error("取消赋权！");
		state.dialogFormVisible = false;
	};

	// 暴露open方法
	const open = () => {
		state.dialogFormVisible = true;
	};
	defineExpose({
		open,
	});

	// 取消订阅/监听
	onBeforeUnmount(() => {
		bus.all.clear()
	})
	
</script>

<style lang="scss" scoped>
	:deep(.el-main){
		min-height: 500px;
	}
</style>