export default {
	data() {
		return {
			mineLsit: [{
				icon: 'icon-wode',
				color: '#dc8450',
				text: '修改昵称'
			},{
				icon: 'icon-mima',
				color: '#56b048',
				text: '修改密码'
			},{
				icon: 'icon-0039',
				color: '#558fcc',
				text: '修改手机'
			},{
				icon: 'icon-news',
				color: '#d4a426',
				text: '系统消息'
			}]
		}
	},
	methods: {
		mineList(index){
			switch(index){
				case 0:
				this.$router.push('/changeName')
				break;
				case 1:
				this.$router.push('/changePassword')
				break;
				case 2:
				this.$router.push('/changephone')
				break;
				case 3:
				this.$router.push('/systemnews')
				break;
			}
		}
	}
}