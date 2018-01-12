import commonServices from '@/server/commonServices'

export default {
	/**
	 * 提交修改信息
	 * method: POST
	 * url: 'user/update'
	 */
	userInfoUpdate({model, Vue, hidenLoading}) {
		return new Promise((resolve, reject)=>{
			commonServices.transport({
				url: 'user/update',
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