import api from '../conf/api'
import config from '../conf/config'
import Vue from 'vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)

function getApiConf (value) {
	if (value) {
		if (typeof (value) === 'string') {
			return { 
				path: value,
				method: 'GET'
			}
		} else {
			if (!value) {
				throw new Error('Api未配置' + JSON.stringify(value))
			}
			if (typeof (value) !== 'object') {
				throw new Error('Api配置错误' + JSON.stringify(value))
			}
			if (!value.method) {
				throw new Error('Api配置错误，缺少method属性' + JSON.stringify(value))
			}
			if (!value.path) {
				throw new Error('Api配置错误，缺少path属性' + JSON.stringify(value))
			}
			return { 
				path: value.path,
				method: value.method.toUpperCase() 
			}
		}
	}
	throw new Error('Api path is null')
}

function getUrl (api) {
	if (process.env.NODE_ENV === 'development') {
		return api.path
	} else {
		let server = api.server || 'default'
		return config.servers[server] + api.server
	}
}

function buildQuery (json) {
	if (!json) {
		return ''
	}
	let query = '?'
	for (let i in json) {
		query += (i + '=' + encodeURIComponent(json[i]) + '&')
	}
	return query
}

function request (settings) {
	let api = settings.api
	let data = settings.data
	let options = settings.options
	let query = settings.query
	
	api = getApiConf(api)
	let url = getUrl(api)
	
	if (api.method === 'GET') {
		url += buildQuery(data)
		return Vue.http.get(url, null, options)
	} else if (api.method === 'POST') {
		url += buildQuery(query)
		return Vue.http.post(url, data, options)
	} else if (api.method === 'PUT') {
		url += buildQuery(query)
		return Vue.http.put(url, data, options)
	} else if (api.method === 'DELETE') {
		url += buildQuery(data)
		return Vue.http.post(url, null, options)
	} else {
		throw new Error('Http method not support => ' + api.method)
	}
}

/**
 * 请求代理类
 */
export default {
	/**
	 * 获取url
	 */
	getUrl (apiKey) {
		let api = getApiConf(apiKey)
		return getUrl(api)
	},
	/**
	 * 请求后端
	 * @param apiKey 获取URL用，即定义在src/conf/api.js中的api的Key
	 * @param data JSON数据
	 * @param options ajax附件参数，主要是http header，用的比较少
	 */
	request (api, data, options) {
		return new Promise((resolve, reject) => {
			request({
				api,
				data,
				options
			}).then((response) => {
				resolve(response.data)
			}, (response) => {
				reject(response)
			})
		})
	},
	/**
	 * @param {
	 * 	api: '' // piKey 获取URL用，即定义在src/conf/api.js中的api的Key
	 *  data: JSNO对象，POST或者PUT到服务端的JOSON数据，如果是GET或者Delete则实际转换成url参数
	 *  query: FormData
	 * }
	 */
	send (settings) {
		return new Promise((resolve, reject) => {
			request(settings).then((response) => {
				resolve(response.data)
			}, (response) => {
				reject(response)
			})
		})
	}
}