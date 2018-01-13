import services from './userSearchServices'

export default {
	data() {
		return {
			userName: ''
		}
	},
	methods: {
		goBack() {
			this.$router.goBack()
		},
		submit() {
			services.search({
				Vue: this,
				model: {
					phone: this.userName
				}
			})
			.then(res=>{
				console.log(res)
				if(res.list.length == 0){
					this.$toast("未查询到相应用户!!")
				}else{
					const {id, phone, nickname, pictureAddress} = res.list[0]
					this.$router.push({
						name: 'FriendsNote',
						params: {
							id, 
							phone, 
							nickname, 
							pictureAddress,
							status: 'add'
						}
					})
				}
			}, err=>{
				console.log(err)
			})
		},
	}
}