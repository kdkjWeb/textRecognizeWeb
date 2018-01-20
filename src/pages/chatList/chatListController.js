import service from './chatListServices'
import { mapGetters } from 'vuex'
import scroll from 'better-scroll'
import {has, getItem , setItem, removeItem, clear} from '@/utils/localStorage'
import {deepClone} from '@/utils/publicFunctions'
import commonServices from '@/server/commonServices'
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
			user: 'getUser', //获取用户信息
			selfUnReadInfos: 'getSelfUnReadInfos', //获取个人聊天未读信息
		})
	},
	watch: {
		'selfUnReadInfos': {
			handler(val) {
				console.log(val)
				for(let elem of Object.values(val)){
					this._setSelfChatUnReadCount(elem)
				}
				
			},
			deep: true
		}
	},
	created() {
		this.height = (window.innerHeight - 112) + 'px'

		//获取聊天记录列表
		this.$set(this, 'selfChatRoomList', deepClone((getItem('selfRoomList') || []).reverse()))

		console.log(getItem('selfRoomList'))




		//设置未读的聊天信息数
		for(let elem of Object.values(this.$store.getters.getSelfUnReadInfos)){
			console.log(elem)
			this._setSelfChatUnReadCount(elem)
		}

		// clear()

	},
	mounted() {
		this._fetchGroupList()

		//使用滚动插件
		this.$nextTick(()=>{
			if(!this.sc){
				this.sc = new scroll(this.$refs['chatList'],{
					click: true
				})
			}else{
				this.sc.refresf()
			}
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

			const {groupId, groupName, id} = room
			this.$router.push({
				name: 'GroupChat',
				params: {groupId, groupName, id}
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
			this.$set(this, 'selfChatRoomList', selfRoomList)
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
		},

		/**
		 * 登录在线时候设置个人聊天记录未读信息数
		 */
		_setSelfChatUnReadCount(data) {
			for(let elem of Object.values(this.selfChatRoomList)){
				console.log(elem)
				if(elem.username == data.msgFrom){
					this.$set(elem, 'warnNum', data.count)
					return
				}
			}

			//没有该聊天记录，则重新新增一个聊天记录
			commonServices.transport({
				url: 'user/selectListByUser',
				model: {
					username: data.msgFrom,
				},
				Vue: this,
				hidenLoading: true
			})
			.then(res=>{
				const {nickname, pictureAddress, username} = res.list[0]
				let arr = getItem('selfRoomList') || []
				arr.push({nickname, pictureAddress, username})
				setItem({
					key: 'selfRoomList', 
					value: deepClone(arr)
				})
				
				this.$set(this, 'selfChatRoomList', deepClone(arr.reverse()))
				for(let elem of Object.values(this.selfChatRoomList)){
					console.log(elem)
					if(elem.username == data.msgFrom){
						this.$set(elem, 'warnNum', data.count)
						return
					}
				}
			})
		},
	}
}