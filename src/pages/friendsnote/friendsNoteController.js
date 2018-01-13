export default {
	data() {
		return {
			noteName: '',
			noteRudece: '',
			nickname: '', //昵称
			pictureAddress: '',//头像
			status: '', //状态: edit、add
		}
	},
	created() {
		console.log(this.$route.params)
		this.status = this.$route.params.status
		this.nickname = this.$route.params.nickname
		this.pictureAddress = this.$route.params.pictureAddress
	},
	computed: {
		title() {
			return this.status == 'add'?'添加好友': '修改备注'
		}
	},
	methods: {
		save(){
			console.log(this.$route.params.friendsName)
			console.log(this.noteName,this.noteRudece)
		},
		backFriends(){
			this.$router.back(-1)
		},
		addFriend() {

		},
	}
}