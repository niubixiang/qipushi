<template>
	<el-dialog v-model="dialog" title="部门消息" width="912px" center destroy-on-close>
	</el-dialog>
</template>

<script lang="ts" setup>
	import {
			reactive,
			ref,
	} from 'vue'
// 弹窗默认为false
	const dialog = ref(false)
	// 暴露open
	const open = () => {
		dialog.value = true
	}
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
</style>