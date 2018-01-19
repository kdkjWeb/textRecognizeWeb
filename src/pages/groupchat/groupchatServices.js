import commonServices from '@/server/commonServices'

export default{
	//解散该群
	dissolveGroup: ({model, Vue, hidenLoading})=>{
		return new Promise((resolve, reject)=>{
			commonServices.fetch({
				url: 'group/deleteGroup',
				model,
				Vue,
				hidenLoading 
			})
			.then(res=>{
			    resolve(res)
			}, err=>{
				reject(err)
			})
		})
	},
	//退出该群
	exitGroup: ({model,Vue,hidenLoading})=>{
		return new Promise((resolve,reject)=>{
			commonServices.transport({
				url: 'group/delMembers',
				model,
				Vue,
				hidenLoading
			}).then(res=>{
				resolve(res)
			},err=>{
				reject(err)
			})
		})
	}
}
