import commonServices from '@/server/commonServices'
export default {
	//查询离散用户可添加列表 
	discreteUserList: ({model,Vue,hidenLoading})=>{
		return new Promise((resolve,reject)=>{
			commonServices.fetch({
				url: '',
				model,
				Vue,
				hidenLoading
			})
			.then(res=>{
				resolve(res)	
			},err=>{
				reject(err)
			})
		})
	},
	//提交选中用户列表
	addDiscreteUserList:({model,Vue,hidenLoading})=>{
		return new Promise((resolve,reject)=>{
			commonServices.transport({
				url: '',
				model,
				Vue,
				hidenLoading
			})
			.then(res=>{
				resolve(res)
			},err=>{
				reject(err)
			})
		})
	}
}