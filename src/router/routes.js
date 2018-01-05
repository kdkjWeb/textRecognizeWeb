/* 管理项目整个路由的加载 */
const Login = ()=>import('@/pages/login/login'),
	  Index = ()=>import('@/pages/index/index'),
	  Register = ()=>import('@/pages/register/register'),
	  FriendsList = ()=>import('@/pages/friendslist/friendslist')
	  //FriendsNote = ()=>import('@/pages/friendsnote/friendsnote')

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
			redirect: 'friendslist',
			children: [
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
		}
	]
}