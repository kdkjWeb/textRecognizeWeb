export default {
	data() {
		return {
			gropName: '',
			gropAnnouncement: '',
			gropSrc: 'http://www.qqzhi.com/uploadpic/2014-09-24/084641953.jpg'
		}
	},
	methods: {
		save(){
			console.log(this.gropName, this.gropAnnouncement)
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}