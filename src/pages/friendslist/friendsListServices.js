import commonServices from '@/server/commonServices'

export default {
	/**
	 * 查询好友列表
	 * @return Promise
	 */
	searchFriendList({model, Vue, hidenLoading}) {
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
}