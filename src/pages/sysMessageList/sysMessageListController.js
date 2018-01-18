import services from './sysMessageListServices'
import commonServices from '@/server/commonServices'
import dateFormat from '@/utils/dateFormat'

export default {
	data() {
		return {
			suggestDialog: {
				show: false,
				model: '', //建议的model
			},
			sysMsgList: []
		}
	},
	created() {
		this._seachSysMsgList()
	},
	methods:{
		goBack() {
			//断开socket链接
			this.$router.goBack()
		},

		/* 建议 */
		suggestSubmit() {
			//提交建议信息
			this.suggestDialog.show = false
		},
		suggestCancel() {
			this.suggestDialog.show = false
		},
		_seachSysMsgList() {
			commonServices.fetch({
				url: 'message/broadcast',
				Vue: this,
			})
			.then(res=>{
				if(res.length > 0){
					console.log(res)
					for(let elem of Object.values(res)){
						elem.date = dateFormat(new Date(parseInt(elem.date)), 'yyyy-MM-dd hh:mm:ss')
					}
					this.$set(this, 'sysMsgList', res.reverse())
				}
				
			}, err=>{
				console.log(err)
			})
		},
	}
}