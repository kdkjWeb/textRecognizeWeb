import commonServices from '@/server/commonServices'

const services = {
	verifyVerificationCode: ({model, Vue, hidenLoading})=>{
		return new Promise((resolve, reject)=>{
			commonServices.transport({
				url: 'phoneifexist',
				model,
				Vue,
			})
			.then(res=>{
				console.log(res)
				if(res.code === 0){
					resolve(true)
				}
			}, err=>{
				console.log(err)
				if(err.data.code === 10)
					Vue.$toast('该手机号已被注册')
				reject(false)
			})
		})
	},
	/**
	 * model: phone, password
	 * url: user/addUser
	 * method: Post
	 * @return Promise
	 */
	register: ({model, Vue, hidenLoading})=>{
		return new Promise((resolve, reject)=>{
			commonServices.transport({
				url: 'user/addUser',
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


	//第一次点击下一步验证数据库中是否存在正在注册的手机号
	/*verfiyPhone: ({model, Vue, hidenLoading})=>{
		return new Promise((resolve, reject)=>{
			commonServices.transport({
				url: 'phoneifexist',
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
	}*/
}

export default services