import commonServices from '@/server/commonServices'

export default {
	/**
	 * url: modifyPwd
	 */
	updatePwd({model, Vue, hidenLoading}) {
		return new Promise((resolve, reject)=>{
			commonServices.transport({
				url: 'user/modifyPwd',
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