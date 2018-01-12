import services from './loginServices'
import {phoneRegExp} from '@/utils/publicFunctions'

export default {
	data() {
		return {
			userName: '',
			password: '',
		}
	},
	methods: {
		login() {
			if(!this.userName || !this.password){
				this.$toast("请输入用户名以及密码")
				return 
			}else if(!phoneRegExp(this.userName)){
				this.$toast("请输入正确的用户名")
				return 
			}
			console.log(this.userName, this.password)
			services.login({
				model: {
					phone: this.userName,
					password: this.password
				},
				Vue: this
			})
			.then(res=>{
				console.log(res)
				this.$router.push({
					path: '/index'
				})
			})

			
		}
	},
}