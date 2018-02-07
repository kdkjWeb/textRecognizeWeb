import services from './selfChatRoomConfigServices'
import {getItem, setItem} from '@/utils/localStorage'
export default {
	data() {
		return {
			mute: null,
		}
	},
	created() {
		this.mute = getItem('mute')
	},
	watch: {
		mute(val) {
			setItem({
				key:'mute',
				value: val
			})
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