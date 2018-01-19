import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
import services from '../login/loginServices'
import Ws from '@/utils/WebSocket'

export default {
	data() {
		return {
			 bottomNav: ''
		}
	},
	beforeRouteEnter:(to, from, next) =>{
		next(vm=>{
			if(from.path == '/' || from.path == '/selfChatRoom'){
				vm._connectWebsocket()
			}
		})
	},
	mounted() {
		let str = this.$route.path
		this.bottomNav = str.substring(7, str.length)

		// this.$router.beforeEach((to, from, next)=>{
		// 	console.log('sss', from.path)
		// 	if(from.path == '/' || from.path == '/selfChatRoom'){
		// 		this._connectWebsocket()
		// 	}
		// 	// next()
		// })
	},

	computed: {
		unReadCount() {return this.$store.state.unReadCount},
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
					//存入vuex
					this.$store.commit('setUser', res)
				})
			}else{
				this.$router.push({
					name: 'Login'
				})
			}
	    },
	    _connectWebsocket() {
	    	//建立总的消息提醒websokcet链接
			if(!this.$store.state.user.username){
				setTimeout(()=>{
					this._getUserInfoByToken()
					Ws.connect({
						url: 'totalWs',
						params: {
							msgFrom: this.$store.state.user.username
						},
						model: this.chatHistory,
						connector: this.$store.state.user
					})
				}, 500)
			}else{
				this._getUserInfoByToken()
				Ws.connect({
					url: 'totalWs',
					params: {
						msgFrom: this.$store.state.user.username
					},
					model: this.chatHistory,
					connector: this.$store.state.user
				})
			}
	    },
	},

}