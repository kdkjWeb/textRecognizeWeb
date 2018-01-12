import commonServices from '@/server/commonServices'

const services = {
	verifyVerificationCode: ()=>{
		return new Promise((resolve, reject)=>{
			//...
			resolve(true)
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
	}
}

export default services