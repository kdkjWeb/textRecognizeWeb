/* 管理项目整个路由的加载 */
const Login = ()=>import('@/pages/login/login'),
	  Index = ()=>import('@/pages/index/index'),
	  Register = ()=>import('@/pages/register/register'),
	  ChatList = ()=>import('@/pages/chatList/chatList')
	  

const FriendsList = ()=>import('@/pages/friendslist/friendslist'),  //好友列表
	  FriendsNote = ()=>import('@/pages/friendsnote/friendsnote'),  //修改备注
	  ChangePassword = ()=>import('@/pages/changePassword/changePassword'),   //修改密码
	  Mine = ()=>import('@/pages/mine/mine'),   //我的
	  changeName = ()=>import('@/pages/changeName/changename'),   //修改昵称
	  changePhone = ()=>import('@/pages/changePhone/changephone'),   //修改手机号
	  systemNews = ()=>import('@/pages/systemnews/systemnews')   //系统消息

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
		}
	]
}