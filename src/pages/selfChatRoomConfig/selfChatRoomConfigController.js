import services from './selfChatRoomConfigServices'
export default {
	data() {
		return {
			mute: null,
		}
	},
	methods: {
		goBack() {
			this.$router.goBack()
		},
		handleToggle(key) {
			this[key] = !this[key]
			console.log(this[key])
		}
	},
}