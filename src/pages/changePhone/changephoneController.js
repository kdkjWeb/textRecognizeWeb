export default {
	data() {
		return {
			userPhone: ''
		}
	},
	methods: {
		save(){
			let reg = /^1[3|4|5|8][0-9]\d{4,8}$/
			if(!reg.test(this.userPhone) || this.userPhone == ''){
				this.$toast('手机号格式不正确');
			}
			console.log(this.userPhone)
			axios.post('/userPhone',{
				userPhone: this.userPhone
			}).then(res=>{
				if(res.data.code == '0'){
					this.$router.push('/mine')
				}
			}).catch(error=>{
				this.$toast('操作失败，请稍后再操作！');
			})
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}