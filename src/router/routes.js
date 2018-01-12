/* 管理项目整个路由的加载 */

const FriendsNote = ()=>import('@/pages/friendsnote/friendsnote'),  //修改备注
	  ChangePassword = ()=>import('@/pages/changePassword/changePassword'),   //修改密码
	  Mine = ()=>import('@/pages/mine/mine'),   //我的
	  changeName = ()=>import('@/pages/changeName/changename'),   //修改昵称
	  changePhone = ()=>import('@/pages/changePhone/changephone'),   //修改手机号
	  FriendsSearch = ()=>import('@/pages/friendssearch/friendssearch'),    //好友搜索
	  CreateGroup = ()=>import('@/pages/creategroup/creategroup'),  //新建群
	  ProposedMembers = ()=>import('@/pages/proposedmembers/proposedmembers'),   //踢出群成员
	  GroupChat = ()=>import('@/pages/groupchat/groupchat'),   //群聊天
	  InviteFriends = ()=>import('@/pages/invitefriends/invitefriends'),    //邀请好友
	  ChangeHeader = ()=>import('@/pages/changeheader/changeheader')    //修改头像

const Login = ()=>import('@/pages/login/login'), // 登录
	  Index = ()=>import('@/pages/index/index'), //主要一级页面
	  Register = ()=>import('@/pages/register/register'), //注册
	  FriendsList = ()=>import('@/pages/friendslist/friendslist'), //好友列表
	  ChatList = ()=>import('@/pages/chatList/chatList'), //消息列表
	  SelfChatRoom = ()=>import('@/pages/selfChatRoom/selfChatRoom'), //个人聊天室
	  SelfChatRoomConfig = ()=>import('@/pages/selfChatRoomConfig/selfChatRoomConfig'), //个人聊天室设置
	  SysMessageList = ()=>import('@/pages/sysMessageList/sysMessageList'), //推送消息列表
	  SysMessageDetail = ()=>import('@/pages/sysMessageDetail/sysMessageDetail'), //系统消息
	  DiscreteUserList = ()=>import('@/pages/discreteUserList/discreteUserList'),  //离散用户列表
	  UserSearch = ()=>import('@/pages/userSearch/userSearch') 


export default {
	routes: [
		{
			path: '/',
		    name: 'Login',
		    component: Login
		},
		{
			path: '/index',
			name: 'Index',
			component: Index,
			redirect: '/index/chatList',
			children: [
				{
					path: 'chatList',
					name: 'ChatList',
					component: ChatList,
				},
				{
					path: 'friendslist',
					name: 'FriendsList',
					component: FriendsList
				},
				{
					path: 'mine',
					name: 'Mine',
					component: Mine		
				}
			]
		},
		{
			path: '/friendsnote',
			name: 'FriendsNote',
			component: FriendsNote
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/changename',
			name: '/changeName',
			component: changeName
		},
		{
			path: '/changePassword',
			name: '/ChangePassword',
			component: ChangePassword
		},
		{
			path: '/changephone',
			name: '/changePhone',
			component: changePhone
		},
		{
			path: '/sysMessageList',
			name: 'SysMessageList',
			component: SysMessageList
		},
		{
			path: '/sysMessageDetail',
			name: 'SysMessageDetail',
			component: SysMessageDetail
		},
		{
			path: '/selfChatRoom',
			name: 'SelfChatRoom',
			component: SelfChatRoom
		},
		{
			path: '/selfChatRoomConfig',
			name: 'SelfChatRoomConfig',
			component: SelfChatRoomConfig
		},
		{
			path: '/friendssearch',
			name: 'FriendsSearch',
			component: FriendsSearch
		},
		{
			path: '/creategroup',
			name: 'CreateGroup',
			component: CreateGroup
		},
		{
			path: '/proposedmembers',
			name: 'ProposedMembers',
			component: ProposedMembers
		},
		{
			path: '/discreteUserList',
			name: 'DiscreteUserList',
			component: DiscreteUserList
		},
		{
			path: '/groupchat',
			name: 'GroupChat',
			component: GroupChat
		},
		{
			path: '/invitefriends',
			name: 'InviteFriends',
			component: InviteFriends
		},
		{
			path: '/changeheader',
			name: 'ChangeHeader',
			component: ChangeHeader
		},
		{
			path: '/userSearch',
			name: 'UserSearch',
			component: UserSearch
		}
	]
}