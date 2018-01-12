import services from './loginServices'
import {phoneRegExp} from '@/utils/publicFunctions'
import {has, getItem , setItem, removeItem} from '@/utils/localStorage'

export default {
	data() {
		return {
			userName: '',
			password: '',
		}
	},
	created() {
		console.log(getItem('token'))
		if(getItem('token')){
			
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
				setItem({
					key: 'token',
					value: res.token
				})
				this.$router.push({
					path: '/index'
				})
			})

		}
	},
}