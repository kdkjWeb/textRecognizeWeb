import commonServices from '@/server/commonServices'

export default {
	/**
	 * 创建群
	 * @return Promise
	 */
	create({model, Vue, hidenLoading}) {
		return new Promise((resolve, reject)=>{
			commonServices.transport({
				url: 'group/addGroup',
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