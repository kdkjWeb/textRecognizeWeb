export default {
	data() {
		return {
			title: '修改备注',
			noteName: '',
			noteRudece: ''
		}
	},
	methods: {
		save(){
			console.log(this.$route.params.friendsName)
			console.log(this.noteName,this.noteRudece)
			
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}