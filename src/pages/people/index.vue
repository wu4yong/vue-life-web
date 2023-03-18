<template>
	<div>
		<component :is="currentView"></component>
	</div>
</template>
<script>
import cList from './list'
import cEdit from './edit'
import {mapGetters} from 'vuex'

export default {
	computed: {
		...mapGetters([
			'currentView',
			'userId'
		])	
	},
	components: {
		list: cList, // 列表页
		edit: cEdit // 编辑页面
	}
}
</script>