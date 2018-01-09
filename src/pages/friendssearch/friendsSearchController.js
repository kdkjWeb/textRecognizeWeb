export default {
	data() {
		return {
			title: '修改备注',
			FriendsAccount: ''
		}
	},
	methods: {
		save(){
			
			console.log(this.FriendsAccount)
			
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}