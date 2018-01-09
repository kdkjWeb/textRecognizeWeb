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
		submit() {},
	}
}