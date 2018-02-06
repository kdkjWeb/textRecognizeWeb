import services from './creategroupServices'

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
			// console.log(this.gropName, this.gropAnnouncement)
			if(!this.gropName){
				this.$toast('创建群失败,群昵称不能为空')
				return;
			}
			services.create({
				Vue: this,
				model: {
					groupName: this.gropName,
					masterId: this.$store.state.user.id,
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