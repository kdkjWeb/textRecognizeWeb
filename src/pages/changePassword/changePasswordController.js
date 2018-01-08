export default {
	data() {
		return {
			oldPassword: '',
			newPassword: '',
			lastPassword: ''
		}
	},
	methods: {
		save(){
			console.log(this.oldPassword,this.newPassword,this.lastPassword)
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}