import services from '../changeName/changenameServices'

export default {
	data() {
		return {
			userPhone: '',
			successDialog: {
				show: false,
			}
		}
	},
	methods: {
		save(){
			let reg = /^1[3|4|5|8][0-9]\d{4,8}$/
			if(!reg.test(this.userPhone) || this.userPhone == ''){
				this.$toast('手机号格式不正确');
			}
			console.log(this.userPhone)
			services.userInfoUpdate({
				Vue: this,
				model: {
					id: this.$store.state.user.id,
					phone: this.userPhone
				}
			})
			.then(res=>{	
				console.log(res)
				this.successDialog.show = true
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