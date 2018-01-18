import services from './sysMessageDetailServices'

export default {
	data() {
		return {
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
	}
}