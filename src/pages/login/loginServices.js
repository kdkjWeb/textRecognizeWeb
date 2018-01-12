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
			}, err=>{
				reject(err)
			})
		})
	},
	/**
	 * 使用token登录
	 * url: 'tokenLogin',
	 * method: GET
	 */
	tokenLogin({model, Vue, hidenLoading}) {
		return new Promise((resolve, reject)=>{
			commonServices.fetch({
				url: 'tokenLogin',
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
	}
}