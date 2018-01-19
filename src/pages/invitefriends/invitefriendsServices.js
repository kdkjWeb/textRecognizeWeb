import commonServices from '@/server/commonServices'
export default{
	//查询邀请好友列表 
	groupMembersList: ({model, Vue, hidenLoading})=>{
		return new Promise((resolve, reject)=>{
			commonServices.fetch({
				url: 'user/findMyFriends',
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
	//提交选中的好友列表 
	addMembersList: ({model,Vue,hidenLoading})=>{
		return new Promise((resolve,reject)=>{
			commonServices.transport({
				url: 'group/addMembers',
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
