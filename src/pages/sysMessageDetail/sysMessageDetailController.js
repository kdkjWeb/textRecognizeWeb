import services from './sysMessageDetailServices'
import scroll from 'better-scroll'
export default {
	data() {
		return {
			height: 0,
			text: {
				title: '',
				date: '',
				content: '',
			},
		}
	},
	created() {
		console.log(this.$route.params)
		const {title, date, msg: content} = this.$route.params
		Object.assign(this.text, {
			title,
			date,
			content
		})
	},
	methods: {
		save(){
			console.log(this.userPhone)
		},
		goBack(){
			this.$router.goBack()
		}
	},
	mounted(){
		this.height = window.innerHeight - 57 + 'px'
		//给显示内容超过以后添加滚动效果
		this.$nextTick(()=>{
			if(!this.Scroll){
				this.Scroll = new scroll(this.$refs['content'],{
					click: true
				})
			}else{
				this.Scroll.refresh();
			}
		})
	}
}