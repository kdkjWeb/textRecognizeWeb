import service from './chatListServices'
import { mapGetters } from 'vuex'
import scroll from 'better-scroll'
import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
// import {deepClone} from '@/utils/publicFunctions'

export default {
	data() {
		return {
			height: 0,
			//群聊天室
			groupChatRoomList: [],

			//个人聊天室记录
			selfChatRoomList: [],

			//删除确认框
			deleteDialog: {
				show: false,
				roomId: null,
				roomDetail: {},
			},
		}
	},
	computed:{
		...mapGetters({
			user: 'getUser'
		})
	},
	created() {
		this.height = (window.innerHeight - 112) + 'px'
		console.log(getItem('selfRoomList'))
		this.$set(this, 'selfChatRoomList', getItem('selfRoomList').reverse())
	},
	mounted() {
		this._fetchGroupList()

		//使用滚动插件
		this.$nextTick(()=>{
			new scroll(this.$refs['chatList'],{
				click: true
			})
		})


		//屏幕发生改变时 
		window.addEventListener('resize',()=>{
			this.height = (window.innerHeight - 112) + 'px'
		})
	},
	methods:{
		enterSelfChatRoom(room) {
			this.$router.push({
				name: 'SelfChatRoom',
				params: room
			})
		},
		enterGroupChatRoom(room) {

			const {groupId, groupName} = room
			//console.log(roomId, title)
			this.$router.push({
				name: 'GroupChat',
				params: {groupId, groupName}
			})
		},
		openDeleteDialog(room) {
			this.deleteDialog.roomDetail = room
			this.deleteDialog.roomId = room.username + '_' + this.$store.state.user.username
			this.deleteDialog.show = true
		},
		deleteSubmit() {
			//1.删除该聊天室的消息记录
			removeItem(this.deleteDialog.roomId)
			//2.从个人聊天室记录列表中删除该聊天室信息
			console.log(getItem('selfRoomList'))
			let selfRoomList = getItem('selfRoomList')
			for(let [index, elem] of Object.entries(selfRoomList)){
				if(elem.username == this.deleteDialog.roomDetail.username){
					selfRoomList.splice(index, 1)
					break
				}
			}
			setItem({
				key: 'selfRoomList', 
				value: selfRoomList
			})
			this.deleteDialog.show = false
		},
		deleteCancel() {
			this.deleteDialog.show = false
		},
		_fetchGroupList() {
			service.fetchGroupList({
				model: {
					userId: this.$store.state.user.id
				},
				Vue: this,
			})
			.then(res=>{
				if(res) this.$set(this, 'groupChatRoomList', res)
			}, err=>{
				console.log(err)
			})
		}
	}
}