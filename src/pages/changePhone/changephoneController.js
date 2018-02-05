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
			let reg = /^[1][3,4,5,7,8][0-9]{9}$/
			if(!reg.test(this.userPhone) || this.userPhone == ''){
				this.$toast('请输入正确的手机号');
				return
			}
			services.userInfoUpdate({
				Vue: this,
				model: {
					id: this.$store.state.user.id,
					phone: this.userPhone
				}
			})
			.then(res=>{	

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