import services from './changegroupinfoServices'

export default {
	data() {
		return {
			gropName: '',
			gropAnnouncement: '',
			gropSrc: 'static/headImg/6.jpg'
		}
	},
	methods: {
		save(){
			console.log(this.gropName, this.gropAnnouncement)
			services.updateGroupName({
				Vue: this,
				model: {
					groupName: this.gropName,
					id: this.$route.params.id,
					notice: this.gropAnnouncement,//群公告
					//群头像
				}
			})
			.then(res=>{
				console.log(res)
				this.$router.push({
					name: 'GroupChat',
					params: res
				})
			}, err=>{
				this.$toast(err.data.msg)
				console.log(err)
			})
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}