export default {
	data() {
		return {
			title: '修改备注',
			noteName: ''
		}
	},
	methods: {
		save(){
			console.log(this.$route.params.friendsName)
			console.log(this.noteName)
			
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}