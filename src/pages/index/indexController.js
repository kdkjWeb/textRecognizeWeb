import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
import services from '../login/loginServices'

export default {
	data() {
		return {
			 bottomNav: ''
		}
	},
	// beforeRouteEnter(to, from, next){
	// 	console.log(from)
	// 	if(!from.name || from.name == 'Login'){
			
	// 	}
	// 	next()
	// },
	created() {
		this._getUserInfoByToken()
	},
	mounted() {
		let str = this.$route.path
		this.bottomNav = str.substring(7, str.length)
	},
	methods: {
		handleChange (val) {
	      this.bottomNav = val
	    },
	    /**
	     * 根据token再次获取用户信息
	     */
	    _getUserInfoByToken() {
	    	if(getItem('token')){
				services.tokenLogin({
					model: {
						token: getItem('token')
					},
					Vue: this
				})
				.then(res=>{
					console.log(res)
					//存入vuex
					this.$store.commit('setUser', res)
				})
			}else{
				this.$router.push({
					name: 'Login'
				})
			}
	    }
	},

}