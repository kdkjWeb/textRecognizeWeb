import services from './changenameServices'
export default {
	data() {
		return {
			userName: '',
			successDialog: {
				show: false,
			}
		}
	},
	created() {
		this.userName = this.$store.state.user.nickname
	},
	methods: {
		save(){
			console.log(this.userName)
			services.userInfoUpdate({
				Vue: this,
				model: {
					nickname: this.userName,
					id: this.$store.state.user.id
				}
			})
			.then(res=>{
				if(res.code === 0){
					this.successDialog.show = true
					this.$store.commit('setNickname',this.userName)
				}
			}, err=>{
				console.log(err)
			})
		},
		backFriends(){
			this.$router.back(-1)
		},
		comfirmDialog() {
			this.successDialog.show = false
			this.$router.push({
				name: "Mine"
			})
		},
	}
}