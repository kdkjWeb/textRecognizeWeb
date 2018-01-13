import commonServices from '@/server/commonServices'

export default {
	/**
	 * 查询群列表
	 */
	fetchGroupList({model, Vue, hidenLoading}) {
		return new Promise((resolve, reject)=>{
			commonServices.fetch({
				url: 'user/findGroups',
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
}