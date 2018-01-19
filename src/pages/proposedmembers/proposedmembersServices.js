import commonServices from '@/server/commonServices'


export default {
	//查询群成员列表
	searchGroupMembers: ({model, Vue, hidenLoading})=>{
		return new Promise((resolve,reject)=>{
			commonServices.fetch({
				url: 'group/findMembers',
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
	
	
	//提交需要踢出的群成员
	proposedMembers: ({model,Vue,hidenLoading})=>{
		return new Promise((resolve,reject)=>{
			commonServices.transport({
				url: 'group/delMembers',
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
