import commonServices from '@/server/commonServices'

export default {
	/**
	 * 创建群
	 * @return Promise
	 */
	updateGroupName({model, Vue, hidenLoading}) {
		return new Promise((resolve, reject)=>{
			commonServices.transport({
				url: 'group/updateGroupName',
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