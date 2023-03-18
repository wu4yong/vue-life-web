import api from 'conf/api'
import backend from './backend'

let initial = false

var dictionares = {} // 字典表数据(key => value)

var organList = {} // 组织机构数据(key => value)

var dataSourceList = {}

export default {
	inited () {
		return initial
	},
	init () {
		return backend.request(api.basedata.get)
		.then((response) => {
			let data = response.json().data
			let dictionary = data.dictionary
			
		    for (let i in dictionary) {
		    	let item = dictionary[i] 
		    	if (!dictionares[item.typeCode]) {
		    		dictionares[item.typeCode] = {}
		    	}
		    	if (!dictionares[item.typeCode][item.code]) {
		    		dictionares[item.typeCode][item.code] = {}
		    	}
		    	dictionares[item.typeCode][item.code] = item
		    }
		    
			let organArray = data.organ
		    for (let i in organArray) {
		    	let item = organArray[i] 
		    	if (!organList[item.code]) {
		    		organList[item.code] = {}
		    	}
		    	organList[item.code] = item
		    }
		    
		    let dataSourceModel = data.dataSourceModel
		    for (let i in dataSourceModel) {
		    	let item = dataSourceModel[i] 
		    	if (!dataSourceList[item.code]) {
		    		dataSourceList[item.code] = {}
		    	}
		    	dataSourceList[item.code] = item
		    }
		    initial = true
		})
	},
	/**
	 * 根据TypeCode和Code获得字典中的某一条数据
	 * typeCode => { code => value }
	 */
	dict (typeCode, code) {
		if (dictionares[typeCode]) {
			return dictionares[typeCode]
		}
		throw new Error('No typeCode for ' + typeCode)
	},
	/**
	 * 根据组织机构编码获得一个组织机构数据
	 */
	organ (key) {
		if (organList[0][key]) {
			return organList[0][key]
		}
		throw new Error('No key for ' + key)
	},
	/**
	 * 获取所有字典数据(key => value)
	 */
	dictionary () {
		return dictionares
	},
	/**
	 * 获得所有组织机构(key => value)
	 */
	organArray () {
		return organList
	},
	dataSourceModel (key) {
		if (dataSourceList[key]) {
			return dataSourceList[key]
		}
		throw new Error('No key for ' + key)
	}
	
}