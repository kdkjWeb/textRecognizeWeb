export default {
	data() {
		return {
			userPhone: ''
		}
	},
	methods: {
		save(){
			console.log(this.userPhone)
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}