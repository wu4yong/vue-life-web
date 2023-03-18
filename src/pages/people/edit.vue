<!--<template>
<div class="panel panel-default user-panel">
	<div class="panel-heading">{{ title }}</div>
	<div class="panel panel-body">
		<div class="form-group">
			<label class="col-sm-3 control-label">姓名：</label>
			<div class="col-sm-9">
				<input class="form-control" type="text" v-model="user.name"/>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-3 control-label">用户名：</label>
			<div class="col-sm-9">
				<input class="form-control" type="text" v-model="user.username"/>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-3 control-label">密码：</label>
			<div class="col-sm-9">
				<input class="form-control" type="text" v-model="user.password"/>
			</div>
		</div>		
		<div class="form-group">
			<label class="col-sm-3 control-label">性别：</label>
			<div class="col-sm-9">
				<input type="radio" name="gander" v-model="user.gender" value="1"/><label>男</label>
				<input type="radio" name="gander" v-model="user.gender" value="0"/><label>女</label>
			</div>
		</div>		
	</div>
	<div class="panel-footer">
		<button class="btn btn-success" @click="onSave">保存</button>
		<button class="btn btn-danger" @click="onCancel">返回</button>
	</div>
</div>
</template>

<script>
import UserDao from 'utils/UserDao'
import {mapGetters} from 'vuex'

let userDao = new UserDao()

export default {
	computed: {
		...mapGetters([
			'currentView',
			'userId'
		])	
	},
	data () {
		return {
			title: '新增用户', 
			user: {}
		}
	},
	created () {
		this.user.id = this.userId
		if (this.user.id) {
			userDao.get(this.user.id).then((user) => {
				this.user = user
			})
		}
	},
	methods: {
		/**
		 * 保存用户
		 */
		onSave () {
			if (this.user.id) {
				userDao.update(this.user).then(() => {
					this.$tDialog.info('更新成功')
					this.$store.state.currentView = 'list'
				}, () => {
					this.$tDialog.info('更新失败')
				})
			} else {
				userDao.insert(this.user).then(() => {
					this.$tDialog.info('新增成功')
					this.$store.state.currentView = 'list'
				}, () => {
					this.$tDialog.info('新增失败')
				})
			}
		},
		/**
		 * 返回事件
		 */
		onCancel () {
			this.$store.state.currentView = 'list'
		}
	}
}
</script>
<style lang="scss">
.user-panel {
	max-width: 500px;
	margin-left: auto;
	margin-right: auto;
}
.user-panel .form-group {
	height: 40px;
}
</style>-->