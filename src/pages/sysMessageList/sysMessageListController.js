import services from './sysMessageListServices'
import commonServices from '@/server/commonServices'
import dateFormat from '@/utils/dateFormat'
import scroll from 'better-scroll'

export default {
	data() {
		return {
			height: 0,
			suggestDialog: {
				show: false,
				model: '', //建议的model
				title: ''
			},
			sysMsgList: []
		}
	},
	/*created() {
		this._seachSysMsgList()
	},*/
	mounted(){
		this._seachSysMsgList()
		this.height = window.innerHeight + 'px'
		this.$nextTick(()=>{
			if(!this.Scroll){
				this.Scroll = new scroll(this.$refs['sysMsg'],{
					click: true
				})
			}else{
				this.Scroll.refresh();
			}
		})
	},
	methods:{
		goBack() {
			//断开socket链接
			this.$router.goBack()
		},

		/* 建议 */
		suggestSubmit() {
			if(!this.suggestDialog.model||!this.suggestDialog.title){
				this.suggestDialog.show = true
				return
			}
			//提交建议信息
			this.suggestDialog.show = false;
			console.log(this.suggestDialog)
			services.sendMsg({
				Vue: this,
				model: {
					msg: this.suggestDialog.model,
					date: (new Date).getTime(),
					title: this.suggestDialog.title
				}
			}).then(res=>{
				console.log(res)
				if(res.code == 0){
					this.$toast('发布成功')
					this.suggestDialog.model = ''
					this.suggestDialog.title = ''
					this._seachSysMsgList()
					this.Scroll.scrollTo(0, 0)
					this.suggestDialog.show = false
				}
			},err=>{
				console.log(err)
			})
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
				/*if(res.length > 0){
					console.log(res)
					for(let elem of Object.values(res)){
						elem.date = dateFormat(new Date(parseInt(elem.date)), 'yyyy-MM-dd hh:mm:ss')
					}
					this.$set(this, 'sysMsgList', res.reverse())
				}*/
				if(res.length>0){
					this.$set(this, 'sysMsgList', res.reverse())
				}
				
			}, err=>{
				console.log(err)
			})
		},
	}
}