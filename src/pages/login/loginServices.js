import commonServices from '@/server/commonServices'

export default {
	/**
	 * 登录
	 */
	login({model, Vue, hidenLoading}) {
		return new Promise((resolve, reject)=>{
			commonServices.transport({
				url: 'login',
				model,
				Vue,
				hidenLoading 
			})
			.then(res=>{
				resolve(res)
			})
		})
	}
}