import commonServices from '@/server/commonServices'

export default {
	/**
	 * 查询用户
	 */
	search({model, Vue, hidenLoading}) {
		return new Promise((resolve, reject)=>{
			commonServices.transport({
				url: 'user/selectListByUser',
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