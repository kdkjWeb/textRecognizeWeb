import services from './changePasswordServices'

export default {
	data() {
		return {
			oldPassword: '',
			newPassword: '',
			lastPassword: '',
			successDialog: {
				show: false,
			}
		}
	},
	methods: {
		save(){
			//console.log(this.oldPassword,this.newPassword,this.lastPassword)

			//8-20位字母数字组合
			let reg = /^[A-Za-z0-9]{8,20}$/;
			let old = reg.test(this.newPassword);
			let last = reg.test(this.lastPassword);
			if(this.oldPassword == ''||this.newPassword == '' || this.lastPassword == ''){
				this.$toast('请输入完整的修改信息');
				return;
			}
			 // if(this.oldPassword != userPass){
				// this.$toast('原密码不正确');
			 // 	return;
			 // }
			if(this.newPassword != this.lastPassword){
				this.$toast('两次输入的密码不一致');
				return;
			}
			if(this.newPassword == this.oldPassword){
				this.$toast('新旧密码相同不需要修改')
				return
			}
			if(!old || !last){
				this.$toast('请输入8-20位字母数字组合格式');
				return;
			}
			services.updatePwd({
				Vue: this,
				model: {
					password: this.oldPassword,
					nickname: this.newPassword,
					id: this.$store.state.user.id
				}
			})
			.then(res=>{
				this.successDialog.show = true
			}, err=>{
				this.$toast(err.data.msg)
				console.log(err)
			})
		},
		backFriends(){
			this.$router.back(-1)
		},
		comfirmDialog() {
			this.successDialog.show = false
			this.$router.push({
				name: "Mine"
			})
		},
	}
}