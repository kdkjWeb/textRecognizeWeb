/* 管理项目整个路由的加载 */
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
					path: '/friendslist',
					name: 'FriendsList',
					component: FriendsList
				}
			]
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
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
		}
	]
}