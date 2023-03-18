let db

export default
/**
 * 用户操作
 */
class UserDao {
	/**
	 * 静态初始化方法
	 */
	static init () {
		// 初始化数据库
		db = window.openDatabase('TYDIC_PROJECT_TEMPLATE', '', 'tydic vue demo', 102400)
		
		// 创建表
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				let sql = `create table if not exists users(
					id integer primary key autoincrement,
					username text,
					password text,
					name text,
					gender integer)`
				tx.executeSql(sql, null, (tx, rs) => {
					resolve()
				}, (tx, err) => {
					reject(err)
				})
			})
		})
	}
	/**
	 * 构造方法
	 */
	constructor () {
		console.log('创建一个UserDao实例')
	}
	/**
	 * 插入一条记录
	 */
	insert (user) {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql('insert into users(username, password, name, gender) values(?,?,?,?)', 
					[user.username, user.password, user.name, user.gender],
					(tx, rs) => {
						resolve()
					}, (tx, err) => {
						reject(err)
					})
				})			
		})
	}
	/**
	 * 更新用户
	 */
	update (user) {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql('update users set username = ?, password = ?, name = ?, gender = ? where id =?', 
					[user.username, user.password, user.name, user.gender, user.id],
					(tx, rs) => {
						resolve()
					}, (tx, err) => {
						reject(err)
					})
			})			
		})
	}
	/**
	 * 根据id删除一个用户
	 */
	remove (id) {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql('delete from users where id = ?', [id],
					(tx, rs) => {
						resolve()
					}, (tx, err) => {
						reject(err)
					})
				})			
		})
	}
	/**
	 * 查询用户列表
	 */
	query () {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql('select * from users', null,
					(tx, rs) => {
						resolve(rs.rows.length ? rs.rows : [])
					}, (tx, err) => {
						reject(err)
					})
				})			
		})
	}
	/**
	 * 根据id查询一个用户
	 */
	get (id) {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql('select * from users where id = ?', [id],
					(tx, rs) => {
						resolve(rs.rows.length > 0 ? rs.rows[0] : null)
					}, (tx, err) => {
						reject(err)
					})
				})			
		})
	}
}