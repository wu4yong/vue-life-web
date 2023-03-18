<!--<template>
<div class="well">
	<div class="row">
		<div class="col-sm-3">
			<label>ID：</label>{{ user.id }}
		</div>
		<div class="col-sm-3">
			<label>名称：</label>{{ user.name }}
		</div>
		<div class="col-sm-3">
			<label>用户名：</label>{{ user.username }}
		</div>
		<div class="col-sm-3">
			<label>性别：</label>{{ getGenderText(user.gender) }}
		</div>	
	</div>	
</div>
</template>

<script>
export default {
	props: {
		user: Object
	},
	methods: {
		getGenderText (gender) {
			if (typeof (gender) === 'undefined') {
				return ''
			} else if (gender === 0) {
				return '女'
			} else if (gender === 1) {
				return '男'
			} else {
				return '错误的值'
			}
		}
	}
}
</script>-->