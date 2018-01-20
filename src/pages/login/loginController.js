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
			services.tokenLogin({
				model: {
					token: getItem('token')
				},
				Vue: this
			})
			.then(res=>{
				//存入vuex
				this.$store.commit('setUser', res)
				this.$router.push({
					path: '/index'
				})
			})
		}
	},
	methods: {
		login() {
			if(!this.userName || !this.password){
				this.$toast("请输入用户名以及密码")
				return 
			}
			// else if(!phoneRegExp(this.userName)){
			// 	this.$toast("请输入正确的用户名")
			// 	return 
			// }
			services.login({
				model: {
					phone: this.userName,
					password: this.password
				},
				Vue: this
			})
			.then(res=>{
				//存入localStorage
				setItem({
					key: 'token',
					value: res.token
				})
				//存入vuex
				this.$store.commit('setUser', res)
				this.$router.push({
					path: '/index'
				})
			})

		}
	},
}