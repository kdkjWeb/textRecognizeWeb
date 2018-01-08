/* 管理项目整个路由的加载 */

const FriendsList = ()=>import('@/pages/friendslist/friendslist'),  //好友列表
	  FriendsNote = ()=>import('@/pages/friendsnote/friendsnote'),  //修改备注
	  ChangePassword = ()=>import('@/pages/changePassword/changePassword'),   //修改密码
	  Mine = ()=>import('@/pages/mine/mine'),   //我的
	  changeName = ()=>import('@/pages/changeName/changename'),   //修改昵称
	  changePhone = ()=>import('@/pages/changePhone/changephone'),   //修改手机号
	  systemNews = ()=>import('@/pages/systemnews/systemnews')   //系统消息

const Login = ()=>import('@/pages/login/login'), // 登录
	  Index = ()=>import('@/pages/index/index'), //主要一级页面
	  Register = ()=>import('@/pages/register/register'), //注册
	  FriendsList = ()=>import('@/pages/friendslist/friendslist'), //好友列表
	  ChatList = ()=>import('@/pages/chatList/chatList'), //消息列表
	  SelfChatRoom = ()=>import('@/pages/selfChatRoom/selfChatRoom'), //个人聊天室
	  SelfChatRoomConfig = ()=>import('@/pages/selfChatRoomConfig/selfChatRoomConfig') //个人聊天室设置


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
					path: 'friendsnote',
					name: 'FriendsNote',
					component: FriendsNote
				},{
					path: 'mine',
					name: 'Mine',
					component: Mine		
				}
			]
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
<<<<<<< HEAD
		},{
			path: '/changename',
			name: '/changeName',
			component: changeName
		},{
			path: '/changePassword',
			name: '/ChangePassword',
			component: ChangePassword
		},{
			path: '/changephone',
			name: '/changePhone',
			component: changePhone
		},{
			path: '/systemnews',
			name: '/systemNews',
			component: systemNews
=======
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
>>>>>>> b55a7c76f8b69ddb2c931ac20d03fdd2d3db831d
		}
	]
}