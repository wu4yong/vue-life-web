<template>
<div>
	<user-details :user="user"></user-details>
	<div class="panel panel-default">
		<div class="panel-heading">
			<div class="row">
				<div class="col-sm-11">新增用户</div>
				<div class="col-sm-1">
					<button class="btn btn-primary" @click="onAdd">新增用户</button>
				</div>
			</div>
		</div>
		<div class="panel-body">
			<table class="table table-striped">
				<thead>
					<th>ID</th>
					<th>名称</th>
					<th>用户名</th>
					<th>性别</th>
					<th>操作</th>
				</thead>
				<tbody>
					<tr v-for="user in users" @click="onRowClick(user)">
						<td>{{ user.id }}</td>
						<td>{{ user.name }}</td>
						<td>{{ user.username }}</td>
						<td>{{ getGenderText(user.gender) }}</td>
						<td>
							<a class="btn btn-link" @click="onEdit(user.id)">修改</a>&nbsp;&nbsp;
							<a class="btn btn-link" @click="onDelete(user.id)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>